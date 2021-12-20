import { SelectInput } from './inputs/index-inputs';
import { useState, useEffect } from 'react';

export default function ChoiceRow({ choiceNo, allChoices, groupedSubjects, weightings, formValues, setFormValues }) {

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

            formValues["data"]["choices"][choiceNo - 1] ? formValues["data"]["choices"][choiceNo - 1].subject = selectedSubject : formValues["data"]["choices"][choiceNo - 1] = { subject: selectedSubject, level: '', weight: 0 }
            setFormValues(formValues)
        }
    }, [selectedSubject, choiceNo, allChoices, formValues, setFormValues])

    useEffect(() => {
        if (selectedLevel) {
            formValues["data"]["choices"][choiceNo - 1] ? formValues["data"]["choices"][choiceNo - 1].level = selectedLevel : formValues["data"]["choices"][choiceNo - 1] = { subject: '', level: selectedLevel, weight: 0 }
            setFormValues(formValues)
        }
    }, [selectedLevel, choiceNo, formValues, setFormValues])

    useEffect(() => {
        if (selectedWeighting) {
            console.log("New subject selected: " + selectedWeighting + " for " + choiceNo)
            formValues["data"]["choices"][choiceNo - 1] ? formValues["data"]["choices"][choiceNo - 1].weight = selectedWeighting : formValues["data"]["choices"][choiceNo - 1] = { subject: '', level: '', weight: selectedWeighting }
            setFormValues(formValues)
        }
    }, [selectedWeighting, choiceNo, formValues, setFormValues])

    return (
        <div className="my-2">
            <h5 className="text-2xl">{"Choice " + choiceNo}</h5>
            <div className="grid sm:grid-cols-3 sm:gap-4">
                <SelectInput
                    name="Subject:"
                    options={groupedSubjects}
                    onChange={e => setSelectedSubject(e.value)} />
                <SelectInput
                    name="Level:"
                    value={selectedLevel
                        ? { value: selectedLevel, label: selectedLevel }
                        : null}
                    options={subjectLevels}
                    onChange={e => setSelectedLevel(e.value)} />
                <SelectInput
                    name="Weighting:"
                    options={weightings.map(weighting => ({ value: weighting, label: weighting }))}
                    onChange={e => setSelectedWeighting(e.value)} />
            </div>
        </div>
    )
}