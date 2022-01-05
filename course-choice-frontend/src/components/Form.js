import React, { useEffect, useState, useReducer } from 'react';
import { fetchDataReducer, formValuesReducer, submittedReducer } from './reducers';
import Login from './Login';
import { Loading, Card, ErrorComponent } from './reusable';
import Header from './form/components/Header';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ActualForm from './form/ActualForm';

// Submitted component, displays success screen
const Submitted = () => (
    <div className="centerpls">
        <Card>
            <h1 className="text-2xl mb-2">Form submitted! 🥳</h1>
            <p>You should recieve an email confirmation shortly.</p>
        </Card>
    </div>
)

function Form() {

    // Get the form ID
    const location = useLocation()
    const id = location.pathname.substring(1)

    // Fetch data state
    const [fetchData, dispatchFetchData] = useReducer(
        fetchDataReducer,
        {
            choices_data: null,
            optional_fields_data: null,
            config: null,
            form_class_options: null,
            wider_achievement_options: null,
            isLoading: true,
            isError: false,
            errorComponent: null,
        }
    );
    const { config, isLoading, isError, errorComponent } = fetchData;

    // Form values state
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
                wider_achievement_choice_1: '',
                wider_achievement_choice_2: '',
            }
        }
    )
    const { data } = formValues;
    const { choices, optional_fields } = data;

    // Submitted state
    const [submitted, dispatchSubmitted] = useReducer(
        submittedReducer,
        {
            isSubmitting: false,
            isSubmitted: false
        }
    )
    const { isSubmitting, isSubmitted, isSubmitError, submitErrorComponent } = submitted;

    // Focus and profile states
    const [focusSet, setFocusSet] = useState(false)
    const [profile, setProfile] = useState()

    // Fetch data
    useEffect(() => {
        async function fetchData() {
            // Initialise fetch data process
            dispatchFetchData({ type: 'DATA_FETCH_INIT' })
            const api = `${process.env.REACT_APP_API_URL}?course_choice_id=${id}`;

            try {
                const result = await axios.get(api);

                // If successfull, set data
                if (result.data.status_code === 200) {
                    dispatchFetchData({
                        type: 'DATA_FETCH_SUCCESS',
                        payload: result.data.data,
                    });
                    console.log(result.data.data)
                } else {
                    // Error occurred, generate error component
                    dispatchFetchData({
                        type: 'DATA_FETCH_FAILURE',
                        payload: <ErrorComponent message={result.data.data[0].message} description={result.data.data[0].description} />
                    })
                }
            } catch (error) {
                // An unknown error occurred, generate error component
                dispatchFetchData({
                    type: 'DATA_FETCH_FAILURE',
                    payload: <ErrorComponent message={"An unknown error has occured"} description={"Please try again later."} />
                })
            }
        }
        fetchData()
    }, [id])

    // When profile changes, update formValues
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

    // Submit form
    const submitForm = (e) => {
        // Prevent default browser behaviour
        e.preventDefault();
        const api = process.env.REACT_APP_API_URL;

        async function postData() {
            // Initialise submit
            dispatchSubmitted({ type: 'SUBMIT_INIT' })

            const response = await fetch(api, {
                method: 'POST',
                mode: 'no-cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues)
            })

            if (response) {
                dispatchSubmitted({ type: 'SUBMIT_SUCCESS' })
            } else {
                dispatchSubmitted({
                    type: 'SUBMIT_FAILURE',
                    payload: <ErrorComponent message={"An unknown error has occured"} description={"Please try again later."} />
                })
            }
        }
        postData()
    }

    // Additional Fields Change
    const handleAdditionalFieldChange = (field, value) => {
        dispatchFormValues({
            type: 'SET_ADDITIONAL_FIELDS',
            payload: { ...optional_fields, [field]: value }
        })
    }

    // Subject Choices Change
    const handleSubjectChoicesChange = (choice, value) => {
        let newChoices = choices;
        newChoices[choice] = value
        dispatchFormValues({
            type: 'SET_CHOICES',
            payload: newChoices
        })
    }

    // Form Class Change
    const handleFormClassChange = (e) => {
        dispatchFormValues({
            type: 'SET_FORM_CLASS',
            payload: e ? e.value : null
        })
    }

    // Wider Achievement Change
    const handleWiderAchievementChange = (values) => {
        dispatchFormValues({
            type: 'SET_WIDER_ACHIEVEMENT',
            payload: values ? values : null
        })
    }

    useEffect(() => {
        console.log("new form values")
        console.log(formValues)
    }, [formValues])

    // Conditional rendering
    if (isSubmitting) {
        // Form is currently submitting
        return (
            <Loading
                text="Submitting..."
                colour="green" />
        )
    } else if (isSubmitted) {
        // Form has been submitted
        return <Submitted />
    } else if (isSubmitError) {
        // An error occurred while submitting
        return submitErrorComponent
    } else if (isLoading) {
        // Form is currently loading
        return (
            <Loading
                text="Loading..."
                colour="blue" />
        )
    } else if (isError) {
        // Error while loading form
        return errorComponent
    } else {
        // Form has loaded
        return (
            <>
                <Card>
                    <Header title={config.title} welcomeMessage={config.welcome_message} imageBlob={config.image_blob} />
                    <Login profile={profile} setProfile={e => setProfile(e)} />
                </Card>

                {profile ? (
                    <ActualForm
                        fetchData={fetchData}
                        submitForm={(e) => submitForm(e)}
                        focusSet={focusSet}
                        setFocusSet={e => setFocusSet(e)}
                        handleFormClassChange={e => handleFormClassChange(e)}
                        handleSubjectChoicesChange={(choice, value) => handleSubjectChoicesChange(choice, value)}
                        handleAdditionalFieldChange={(field, value) => handleAdditionalFieldChange(field, value)}
                        handleWiderAchievementChange={(values) => handleWiderAchievementChange(values)}
                    />
                ) : (
                    null
                )}
            </>
        )
    }
}

export default Form;
