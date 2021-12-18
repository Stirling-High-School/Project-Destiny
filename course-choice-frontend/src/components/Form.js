import React, { useEffect, useState } from 'react'
import { TextInput, LongTextInput, SelectInput } from './FormComponents'
import Login from './LoginHooks';

function ChoiceRow({ choiceNo, allChoices, groupedSubjects, weightings, formValues, setFormValues }) {

    const [selectedSubject, setSelectedSubject] = useState()
    const [selectedLevel, setSelectedLevel] = useState()
    const [selectedWeighting, setSelectedWeighting] = useState()
    const [subjectLevels, setSubjectLevels] = useState([])

    useEffect(() => {
        if (selectedSubject) {
            let subjectObject = allChoices.find(subjectObj => subjectObj.subject === selectedSubject)
            let levels = subjectObject["levels"].map(level => ({ value: level.display_name, label: level.display_name }))
            setSubjectLevels(levels)
            setSelectedLevel(null)
        }
    }, [selectedSubject])

    const handleChangeSubject = (e) => {
        let selected = e.value
        setSelectedSubject(selected)
        console.log("New subject selected: " + selected + " for " + choiceNo)
        formValues["data"]["choices"][choiceNo - 1] ? formValues["data"]["choices"][choiceNo - 1].subject = selected : formValues["data"]["choices"][choiceNo - 1] = { subject: selected, level: '', weight: 0 }
        setFormValues(formValues)
    }

    const handleChangeLevel = (e) => {
        let selected = e.value
        setSelectedLevel(selected)
        console.log("New subject selected: " + selected + " for " + choiceNo)
        formValues["data"]["choices"][choiceNo - 1] ? formValues["data"]["choices"][choiceNo - 1].level = selected : formValues["data"]["choices"][choiceNo - 1] = { subject: '', level: selected, weight: 0 }
        setFormValues(formValues)
    }

    const handleChangeWeighting = (e) => {
        let selected = e.value
        setSelectedWeighting(selected)
        console.log("New subject selected: " + selected + " for " + choiceNo)
        formValues["data"]["choices"][choiceNo - 1] ? formValues["data"]["choices"][choiceNo - 1].weight = selected : formValues["data"]["choices"][choiceNo - 1] = { subject: '', level: '', weight: selected }
        setFormValues(formValues)
    }

    return (
        <div className="my-2">
            <h5 className="text-2xl">{"Choice " + choiceNo}</h5>
            <div className="grid sm:grid-cols-3 sm:gap-4">
                <SelectInput
                    name="Subject:"
                    options={groupedSubjects}
                    onChange={handleChangeSubject} />
                <SelectInput
                    name="Level:"
                    value={selectedLevel
                        ? { value: selectedLevel, label: selectedLevel }
                        : null}
                    options={subjectLevels}
                    onChange={handleChangeLevel} />
                <SelectInput
                    name="Weighting:"
                    options={weightings}
                    onChange={handleChangeWeighting} />
            </div>
        </div>

    )
}

function SubjectChoices({ numChoices, allChoices, groupedSubjects, weightings, formValues, setFormValues }) {

    let choices = []
    for (let x = 1; x <= numChoices; x++) choices.push(x)

    function handleFormUpdate(e) {
        setFormValues(e)
    }

    return (
        <div className="bg-white mt-10 p-8 md:p-14 rounded-3xl shadow-lg">
            <h3 className="mb-5 text-4xl">Your Course Choices</h3>
            {choices.map((choice, index) => (
                <ChoiceRow
                    key={index}
                    choiceNo={choice}
                    allChoices={allChoices}
                    groupedSubjects={groupedSubjects}
                    weightings={weightings}
                    formValues={formValues}
                    setFormValues={handleFormUpdate} />
            ))}
        </div>
    )
}

function AdditionalFields({ additional_fields, formValues, setFormValues }) {

    const [additionalFieldValues, setAdditionalFieldValues] = useState({})

    function handleChange(e) {
        console.log("change additional field: " + e.target.name + " value: " + e.target.value)
        let newAdditionalFields = additionalFieldValues
        newAdditionalFields[e.target.name] = e.target.value
        setAdditionalFieldValues(newAdditionalFields)
        console.log(newAdditionalFields)
        formValues["data"]["optional_fields"] = newAdditionalFields
        setFormValues(formValues)
    }

    function handleChangeSelect(e, name) {
        console.log("change additional field: " + name + " value: " + e.value)
        let newAdditionalFields = additionalFieldValues
        newAdditionalFields[name] = e.value
        setAdditionalFieldValues(newAdditionalFields)
        console.log(newAdditionalFields)
        formValues["data"]["optional_fields"] = newAdditionalFields
        setFormValues(formValues)
    }

    return (
        <div className="bg-white mt-10 p-8 md:p-14 rounded-3xl shadow-lg">
            <h1 className="text-4xl">Additional Fields</h1>
            {additional_fields.map(({ name, description, type, options, required }, index) => {

                if (type === "text") {
                    return <TextInput
                        key={index}
                        name={name}
                        type="text"
                        description={description}
                        required={required}
                        onChange={handleChange} />
                } else if (type === "long_text") {
                    return <LongTextInput
                        key={index}
                        name={name}
                        type="text"
                        description={description}
                        required={required}
                        onChange={handleChange} />
                } else if (type === "restricted_choice") {
                    return <SelectInput
                        key={index}
                        name={name}
                        description={description}
                        options={options.map(option => ({ value: option, label: option }))}
                        required={required}
                        onChange={handleChangeSelect} />
                }

            })}
        </div>
    )
}

function PersonalDetails({ formClasses, profile, formValues, setFormValues }) {

    function handleFormClassChange(e) {
        let current = formValues
        current["data"].form_class = e.value
        setFormValues(current)
        console.log(current)
    }

    return (
        <div className="bg-white mt-10 p-8 md:p-14 rounded-3xl shadow-lg">
            <TextInput
                name="Name"
                value={profile.name}
                disabled={true}
                type="text" />
            <TextInput
                name="Name"
                value={profile.email}
                disabled={true}
                type="text" />
            <SelectInput
                name="Form Class"
                options={formClasses.map(formClass => ({ value: formClass, label: formClass }))}
                required={true}
                onChange={e => handleFormClassChange(e)} />
        </div>
    )
}

function CourseChoiceForm() {

    const [profile, setProfile] = useState()
    const [additionalFields, setAdditionalFields] = useState([])
    const [choices, setChoices] = useState([])
    const [groupedSubjects, setGroupedSubjects] = useState(null)

    const [formValues, setFormValues] = useState({
        type: '',
        data: {
            email: '',
            name: '',
            form_class: '',
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

    // TEMP
    const formClasses = ["4D1", "4D2", "4D3"]

    const numChoices = 5;
    // TODO: restrict weightings?
    const weightings = [{ value: 1, label: "1 - most important" },
    { value: 2, label: "2" },
    { value: 3, label: "3 - least important" }]

    useEffect(() => {
        const api = "https://script.google.com/macros/s/AKfycbyHBUEgJfD4itr-ti7-n8bf_x76_5RAuH1M-2MiVGLs58a2hL9jG_kXjSdereNUXiarWQ/exec?course_choice_id=s45";

        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                setAdditionalFields(data.data.additional_fields)
                setChoices(data.data.choices)
                setGroupedSubjects(groupSubjects(data.data.choices))
            });
    }, [])

    function submitForm() {
        console.log("submitting form!")
        let current = formValues
        current["data"].name = profile.name
        current["data"].email = profile.email
        setFormValues(current)
        console.log(current)
    }

    function handleFormUpdate(e) {
        setFormValues(e)
        console.log("Updated form values ")
        console.log(e)
    }

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
        return groupedSubjectsArr
    }

    return (
        <>
            <Login profile={profile} setProfile={e => setProfile(e)} />
            <div className="m-5">
                {profile ? <PersonalDetails formClasses={formClasses} profile={profile} formValues={formValues} setFormValues={handleFormUpdate} /> : null }
                {groupedSubjects && choices &&
                    <SubjectChoices
                        numChoices={numChoices}
                        allChoices={choices}
                        groupedSubjects={groupedSubjects}
                        weightings={weightings}
                        formValues={formValues}
                        setFormValues={handleFormUpdate}
                    />}
                <AdditionalFields additional_fields={additionalFields} formValues={formValues} setFormValues={handleFormUpdate} />
                <button onClick={submitForm} type="submit" className="cursor-pointer my-10 px-5 py-3 bg-blue-700 rounded-xl text-gray-100 sm:w-1/3 md:w-1/6">Submit</button>
                <p className="mb-2">Please make sure that your choices are correct before submitting.</p>
                <p>You will recieve and email confirmation with your choices.</p>
            </div>
        </>
    )
}

export default CourseChoiceForm