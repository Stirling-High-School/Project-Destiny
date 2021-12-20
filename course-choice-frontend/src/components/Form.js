import React, { useEffect, useState } from 'react'
import { AdditionalFields, SubjectChoices } from './form/index-forms'
import Loading from './reusable/Loading';
import Header from './Header';

function groupSubjects(choices) {

    let groupedSubjectsArr = [{
        label: choices[0].department,
        options: [
            { label: choices[0].subject, value: choices[0].subject }
        ]
    }]

    for (let i = 1; i < choices.length; i++) {

        let { department, subject } = choices[i]
        let currentDep = groupedSubjectsArr.find(choice => choice.label === department)

        if (currentDep) currentDep["options"].push({ label: subject, value: subject })
        else {
            groupedSubjectsArr.push({
                label: department,
                options: [
                    { label: subject, value: subject }
                ]
            })
        }
    }
    return groupedSubjectsArr;
}

export default function Form() {

    // const [profile, setProfile] = useState()
    const [data, setData] = useState()
    const [formValues, setFormValues] = useState({
        type: '',
        data: {
            email: '',
            name: '',
            form_class: '',
            course_choice_id: 's45',
            choices: [
                {
                    subject: '',
                    level: '',
                    weight: 0
                }
            ],
            optional_fields: {},
        }
    })

    const api = "https://script.google.com/macros/s/AKfycbxendJicJ5Z2SW9kg1bS9R-Xfxy9AL_qaVwqEC7SF0gJGTUGkLxI9TqMyo6w0Cupt1IFg/exec?course_choice_id=s45";

    useEffect(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                setData(data.data)
                console.log(data.data)
            });
    }, [])

    useEffect(() => {
        console.log("New form values: ")
        console.log(formValues)
    }, [formValues])

    function submitForm() {
        console.log("submitting form!")
        let current = formValues
        // current["data"].name = profile.name
        // current["data"].email = profile.email
        setFormValues(current)
        console.log(JSON.stringify(current))

        fetch(api, {
            method: 'POST',
            mode: 'no-cors',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(current)
        })
    }

    return (
        data ?
        <div className="py-8 px-1 md:py-12 md:px-12 lg:py-14 lg:px-48 h-full">
            <Header title={data.config.title} welcomeMessage={data.config.welcome_message} imageBlob={data.config.image_blob} />
            <div className="m-5">
                {/* {profile ? <PersonalDetails
                    formClasses={data.form_class_options}
                    profile={profile}
                    formValues={formValues}
                    setFormValues={e => setFormValues(e)} />
                    : null} */}
                <SubjectChoices
                    maxChoices={data.config.max_choices}
                    minChoices={data.config.min_choices}
                    allChoices={data.choices}
                    groupedSubjects={groupSubjects(data.choices)}
                    weightings={data.config.weightings}
                    formValues={formValues}
                    setFormValues={e => setFormValues(e)} />
                <AdditionalFields
                    additional_fields={data.additional_fields}
                    formValues={formValues}
                    setFormValues={e => setFormValues(e)} />
                <button onClick={submitForm} type="submit" className="cursor-pointer my-10 px-5 py-3 bg-blue-700 rounded-xl text-gray-100 sm:w-1/3 md:w-1/6">
                    Submit
                </button>
                <p className="mb-2">Please make sure that your choices are correct before submitting.</p>
                <p>You will recieve and email confirmation with your choices.</p>
            </div>
        </div> 
        : <Loading />
    )
}
