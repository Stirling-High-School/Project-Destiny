import React, { useEffect, useState, useReducer } from 'react';
import { fetchDataReducer, formValuesReducer, submittedReducer } from '../reducers';
import { Loading, MessageComponent } from '../reusable';
import axios from 'axios';
import { AdditionalFields, Submit, CourseChoices, FormClass, WiderAchievementOptions, Header } from './components'

// Renders the form sections
export default function ActualForm({ profile, id }) {

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
    const { isLoading, isError, errorComponent, choices_data, grouped_choices_data, optional_fields_data, config, form_class_options, wider_achievement_options } = fetchData;

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

    // Fetch data
    useEffect(() => {
        async function fetchData() {
            // Initialise fetch data process
            dispatchFetchData({ type: 'DATA_FETCH_INIT' })
            const api = `${process.env.REACT_APP_API_URL}?course_choice_id=${id}&email=${profile.email}`;

            try {
                const result = await axios.get(api);
                console.log(result)

                // If successfull, set data
                if (result.data.status_code === 200) {
                    dispatchFetchData({
                        type: 'DATA_FETCH_SUCCESS',
                        payload: result.data.data,
                    });
                } else {
                    // Error occurred, generate error component
                    dispatchFetchData({
                        type: 'DATA_FETCH_FAILURE',
                        payload: <MessageComponent message={result.data.data[0].message} description={result.data.data[0].description} isError />
                    })
                }
            } catch (error) {
                // An unknown error occurred, generate error component
                dispatchFetchData({
                    type: 'DATA_FETCH_FAILURE',
                    payload: <MessageComponent message={"An unknown error has occured"} description={"Please try again later."} isError />
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
                    payload: <MessageComponent message={"An unknown error has occured"} description={"Please try again later."} isError />
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
        return <MessageComponent message={"Form submitted!"} description={"You should recieve an email confirmation shortly."} />
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
                <Header
                    title={config.title}
                    welcomeMessage={config.welcome_message}
                    imageBlob={config.image_blob}
                    profile={profile} />
                <form onSubmit={e => submitForm(e)}>
                    {/* Form class section */}
                    <FormClass
                        formClasses={form_class_options}
                        handleFormClassChange={handleFormClassChange}
                        setFocusSet={e => (setFocusSet(e))}
                        canFocus={!focusSet}
                    />
                    {/* Course choices section */}
                    <CourseChoices
                        message={config.subject_choice_message}
                        maxChoices={config.max_choices}
                        minChoices={config.min_choices}
                        allChoices={choices_data}
                        // Send grouped subjects. useMemo to reduce unnecessary renders...
                        groupedSubjects={grouped_choices_data}
                        weightings={config.weightings}
                        handleSubjectChoicesChange={(choice, value) => handleSubjectChoicesChange(choice, value)}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={!focusSet}
                        backup_message={config.backup_message}
                    />
                    {/* Additional fields section */}
                    <AdditionalFields
                        title={config.optional_fields_title}
                        message={config.optional_fields_message}
                        additional_fields={optional_fields_data}
                        handleAdditionalFieldChange={(field, value) => handleAdditionalFieldChange(field, value)}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={!focusSet}
                    />
                    {wider_achievement_options &&
                        <WiderAchievementOptions
                            wider_achievement_options={wider_achievement_options}
                            message={config.wider_achievement_message}
                            handleWiderAchievementChange={(values) => handleWiderAchievementChange(values)}
                            setFocusSet={e => setFocusSet(e)}
                            canFocus={!focusSet}
                        />}
                    {/* Submit button + message */}
                    <Submit message={config.submit_message} />
                </form>
            </>
        )
    }
}