import React, { useEffect, useState, useReducer } from 'react'
import { AdditionalFields, PersonalDetails, SubjectChoices } from './form/index-forms'
import Login from './Login';
import Loading from './reusable/Loading';
import Header from './Header';
import groupSubjects from './groupSubjects';
import { toast } from 'react-toastify';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import ErrorComponent from './form/errors/ErrorComponent';
import Submit from './form/Submit';
import ActualForm from './ActualForm';

function fetchDataReducer(state, action) {
    switch (action.type) {
        case 'DATA_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'DATA_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                choices_data: action.payload.choices,
                optional_fields_data: action.payload.additional_fields,
                config: action.payload.config,
                form_class_options: action.payload.form_class_options,
            };
        case 'DATA_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorComponent: action.payload,
            };
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.payload,
            }
        default:
            throw new Error();
    }
}

function formValuesReducer(state, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                data: { ...state.data, name: action.payload },
            }
        case 'SET_EMAIL':
            return {
                ...state,
                data: { ...state.data, email: action.payload },
            }
        case 'SET_FORM_CLASS':
            return {
                ...state,
                data: { ...state.data, form_class: action.payload },
            }
        case 'SET_CHOICES':
            return {
                ...state,
                data: { ...state.data, choices: action.payload },
            }
        case 'SET_ADDITIONAL_FIELDS':
            return {
                ...state,
                data: { ...state.data, optional_fields: action.payload },
            }
        default:
            throw new Error();
    }
}

function Form() {

    const location = useLocation()
    const id = location.pathname.substring(1)

    const [profile, setProfile] = useState()

    const [fetchData, dispatchFetchData] = useReducer(
        fetchDataReducer,
        {
            choices_data: null,
            optional_fields_data: null,
            config: null,
            form_class_options: null,
            isLoading: true,
            isError: false,
            errorComponent: null
        }
    );
    const { choices_data, optional_fields_data, config, form_class_options, isLoading, isError, errorComponent } = fetchData;

    const [formValues, dispatchFormValues] = useReducer(
        formValuesReducer,
        {
            type: 'form_response',
            data: {
                email: '',
                name: '',
                form_class: '',
                course_choice_id: id,
                choices: [],
                optional_fields: {},
            }
        }
    )
    const { data } = formValues;
    const { choices, optional_fields } = data

    const [focusSet, setFocusSet] = useState(false)

    useEffect(() => {
        async function fetchData() {
            dispatchFetchData({ type: 'DATA_FETCH_INIT' })
            const api = `https://script.google.com/macros/s/AKfycbwl_u-N1_mbOzZGXz1TXZPdlJ9D78_cDzvWqynJQuEM-UcX_Q-icyZ-TO1C_ZQSpbP6WA/exec?course_choice_id=${id}`;
            try {
                const result = await axios.get(api);
                console.log(result.data.data)
                if (result.data.status_code === 200) {
                    dispatchFetchData({
                        type: 'DATA_FETCH_SUCCESS',
                        payload: result.data.data,
                    });
                } else {
                    dispatchFetchData({
                        type: 'DATA_FETCH_FAILURE',
                        payload: <ErrorComponent message={result.data.data[0].message} description={result.data.data[0].description} />
                    })
                }
            } catch (error) {
                dispatchFetchData({
                    type: 'DATA_FETCH_FAILURE',
                    payload: <ErrorComponent message={"An unknown error has occured"} description={"Please try again later."} />
                })
            }
        }
        fetchData()
    }, [id])

    useEffect(() => {
        console.log("New form values: ")
        console.log(formValues)
    }, [formValues])

    useEffect(() => {
        if (profile) {
            dispatchFormValues({
                type: 'SET_NAME',
                payload: profile.displayName,
            })
            dispatchFormValues({
                type: 'SET_EMAIL',
                payload: profile.email,
            })
        }
    }, [profile])

    const submitForm = (e) => {
        e.preventDefault();

        const api = 'https://script.google.com/macros/s/AKfycbwl_u-N1_mbOzZGXz1TXZPdlJ9D78_cDzvWqynJQuEM-UcX_Q-icyZ-TO1C_ZQSpbP6WA/exec';

        console.log("submitting form!")
        console.log(formValues)

        const postData = () => {
            return fetch(api, {
                method: 'POST',
                mode: 'no-cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues)
            })
        }

        const response = toast.promise(
            postData(),
            {
                pending: 'Submitting form...',
                success: 'Form submitted!',
                error: 'There was an error submitting the form!'
            }
        )

        if (response.isFulfilled) {
            <Link to='/submitted' />
        }
    }

    const handleAdditionalFieldChange = (field, value) => {
        dispatchFormValues({
            type: 'SET_ADDITIONAL_FIELDS',
            payload: { ...optional_fields, [field]: value }
        })
    }

    const handleSubjectChoicesChange = (choice, value) => {
        let newChoices = choices;
        newChoices[choice] = value
        dispatchFormValues({
            type: 'SET_CHOICES',
            payload: newChoices
        })
    }

    const handleFormClassChange = (e) => {
        dispatchFormValues({
            type: 'SET_FORM_CLASS',
            payload: e.value
        })
    }

    return (
        <>
            {isLoading ? <Loading /> : (
                <>
                    {isError ? errorComponent : (
                        <>
                            <Header title={config.title} welcomeMessage={config.welcome_message} imageBlob={config.image_blob} />
                            <Login profile={profile} setProfile={e => setProfile(e)} />

                            {profile ? (
                                <ActualForm
                                    fetchData={fetchData}
                                    submitForm={(e) => submitForm(e)}
                                    focusSet={focusSet}
                                    setFocusSet={e => setFocusSet(e)}
                                    handleFormClassChange={e => handleFormClassChange(e)}
                                    handleSubjectChoicesChange={e => handleSubjectChoicesChange(e)}
                                    handleAdditionalFieldChange={e => handleAdditionalFieldChange(e)}
                                />
                            ) : (
                                null
                            )}
                        </>)}
                </>)}
        </>
    )
}

export default Form;
