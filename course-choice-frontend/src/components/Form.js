import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { TextInput, LongTextInput, SelectInput } from './FormComponents'

function SubjectChoices({ numChoices, allChoices, groupedSubjects, weightings }) {

    const [selectedSubject, setSelectedSubject] = useState("Administration and IT")
    const [selectedLevel, setSelectedLevel] = useState()
    const [selectedWeighting, setSelectedWeighting] = useState()

    const [levels, setLevels] = useState([])

    // TODO: do this other way around (level affects availible subjects)

    useEffect(() => {
        let subjectObject = allChoices.find(subjectObj => subjectObj.subject === selectedSubject)
        let levels = subjectObject["levels"].map(level => ({ value: level.level_abreviation, label: level.display_name }))
        setLevels(levels)
    }, [selectedSubject])

    let choices = []
    for (let x = 1; x <= numChoices; x++) choices.push("Choice " + x)

    // TODO weightings reduce
    let uniqueWeightings = [...new Set(weightings)];

    return (
        <div>
            <h3>Select your choices: </h3>
            {choices.map((choice, index) => (
                <div key={index}>
                    <h6>{choice}</h6>
                    <Row>
                        <Col>
                            <SelectInput name="Subject:" options={groupedSubjects} onChange={e => setSelectedSubject(e)} />
                        </Col>
                        <Col>
                            <SelectInput name="Level:" options={levels} onChange={e => setSelectedLevel(e)} />
                        </Col>
                        <Col>
                            <SelectInput name="Weighting:" options={uniqueWeightings.map(weighting => ({ value: weighting, label: weighting }))} onChange={e => setSelectedWeighting(e)} />
                        </Col>
                    </Row>
                </div>
            ))}
        </div>
    )
}

const AdditionalFields = ({ additional_fields }) => (
    <>
        <h1>Additional Fields</h1>
        {additional_fields.map(({ name, description, type, options, required }, index) => {

            if (type === "text") {
                return <TextInput key={index} name={name} type="text" description={description} required={required} />
            } else if (type === "long_text") {
                return <LongTextInput key={index} name={name} type="text" description={description} required={required} />
            } else if (type === "restricted_choice") {
                return <SelectInput key={index} name={name} description={description} options={options.map(option => ({ value: option, label: option }))} required={required} />
            }

        })}
    </>
)

function CourseChoiceForm() {

    const [additionalFields, setAdditionalFields] = useState([])
    const [choices, setChoices] = useState([])
    const [groupedSubjects, setGroupedSubjects] = useState(null)

    const numChoices = 5;
    const weightings = [1, 1, 1, 2, 3]

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
        <div className="m-5">
            {groupedSubjects && choices && <SubjectChoices numChoices={numChoices} allChoices={choices} groupedSubjects={groupedSubjects} weightings={weightings} />}
            <AdditionalFields additional_fields={additionalFields} />
        </div>
    )
}

export default CourseChoiceForm