import React, { useEffect, useState, useReducer } from 'react';
import { fetchDataReducer, formValuesReducer, submittedReducer } from './reducers';
import Login from './Login';
import { Loading } from './reusable';
import Header from './form/components/Header';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ErrorComponent from './form/errors/ErrorComponent';
import ActualForm from './form/ActualForm';
import Submitted from './Submitted';

function Form() {

    const location = useLocation()
    const id = location.pathname.substring(1)

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
    const { config, isLoading, isError, errorComponent } = fetchData;

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
    const { choices, optional_fields } = data;

    const [submitted, dispatchSubmitted] = useReducer(
        submittedReducer,
        {
            isSubmitting: false,
            isSubmitted: false
        }
    )
    const { isSubmitting, isSubmitted } = submitted;

    const [focusSet, setFocusSet] = useState(false)
    const [profile, setProfile] = useState()

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

        async function postData() {

            dispatchSubmitted({ type: 'SUBMIT_INIT' })

            const response = await fetch(api, {
                method: 'POST',
                mode: 'no-cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues)
            })

            if (response) dispatchSubmitted({ type: 'SUBMIT_SUCCESS' })
        }

        postData()
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


    if (isSubmitting) {
        return <Loading text="Submitting..." colour="green" />
    } else if (isSubmitted) {
        return <Submitted />
    } else if (isLoading) {
        return <Loading text="Loading..." colour="blue" />
    } else if (isError) {
        return errorComponent
    } else {
        return (
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
                        handleSubjectChoicesChange={(choice, value) => handleSubjectChoicesChange(choice, value)}
                        handleAdditionalFieldChange={(field, value) => handleAdditionalFieldChange(field, value)}
                    />
                ) : (
                    null
                )}
            </>
        )
    }
}

export default Form;
