import ChoiceRow from './ChoiceRow';
import { Card, FormHeading } from '../../reusable';
import { useState } from 'react';
import { formatWeightings, modifyAvailableSubjects, modifyAvailableWeightings } from '../../functions';

export default function SubjectChoices({ message, maxChoices, minChoices, allChoices, groupedSubjects, weightings, handleSubjectChoicesChange, setFocusSet, canFocus }) {

    let choices = []
    for (let x = 1; x <= maxChoices; x++) choices.push(x)

    const [availableSubjects, setAvailableSubjects] = useState(groupedSubjects);
    const [availableWeightings, setAvailableWeightings] = useState(weightings.map((weight) => ({
        label: weight,
        value: weight,
        isDisabled: false
    })))

    const handleChange = (choice, value) => {
        handleSubjectChoicesChange(choice, value);

        if (value.weight) {
            setAvailableWeightings(modifyAvailableWeightings(value.weight, true, availableWeightings))
        } else if (value.subject) {
            setAvailableSubjects(modifyAvailableSubjects(value.subject, true, availableSubjects))
        }
    }

    return (
        <Card>
            <FormHeading>Course Choices</FormHeading>
            <p className="mb-6">{message}</p>
            
            {choices.map((choice, index) => {
                return (
                    <ChoiceRow
                        key={index}
                        choiceNo={choice}
                        allChoices={allChoices}
                        groupedSubjects={availableSubjects}
                        weightings={formatWeightings(availableSubjects)}
                        handleSubjectChoicesChange={(choice, value) => handleChange(choice, value)}
                        reinstateSubject={(subject) => modifyAvailableSubjects(subject, false, availableSubjects)}
                        reinstateWeight={(weight) => modifyAvailableWeightings(weight, false, availableWeightings)}
                        required={((choice - 1) < minChoices) ? true : false}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus}
                        last={(choice === choices.length) ? true : false} />
                )
            })}
        </Card>
    )
}