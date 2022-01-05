import ChoiceRow from './ChoiceRow';
import BackupOption from './BackupOption';
import { Card, FormHeading } from '../../reusable';
import { useState } from 'react';
import { formatWeightings, modifyAvailableSubjects, modifyAvailableWeightings } from '../../functions';

// Renders the subject choices
export default function SubjectChoices({ message, maxChoices, minChoices, allChoices, groupedSubjects, weightings, handleSubjectChoicesChange, setFocusSet, canFocus, backup_message }) {

    // Turns maxChoices into an array from 1 to maxChoices
    let choices = []
    for (let x = 1; x <= maxChoices; x++) choices.push(x)

    const [availableSubjects, setAvailableSubjects] = useState(groupedSubjects);
    const [availableWeightings, setAvailableWeightings] = useState(weightings.map((weight) => ({
        label: weight,
        value: weight,
        isDisabled: false
    })))
    const [formattedWeightings, setFormattedWeightings] = useState(formatWeightings(weightings.map((weight) => ({
        label: weight,
        value: weight,
        isDisabled: false
    }))))

    const handleChange = (choice, value) => {
        // Push values to formValues
        handleSubjectChoicesChange(choice, value);

        // Modify the available weightings or subjects to add/remove options
        if (value.weight) {
            const modifiedWeightings = modifyAvailableWeightings(value.weight, true, availableWeightings)
            setAvailableWeightings(modifiedWeightings)
            setFormattedWeightings(formatWeightings(modifiedWeightings))
        } else if (value.subject) {
            setAvailableSubjects(modifyAvailableSubjects(value.subject, true, availableSubjects))
        }
    }

    return (
        <Card>
            <FormHeading>Course Choices</FormHeading>
            <p className="mb-6">{message}</p>

            {/* Render a choice row for each choice */}
            {choices.map((choice, index) => (
                <ChoiceRow
                    key={index}
                    choiceNo={choice}
                    allChoices={allChoices}
                    groupedSubjects={availableSubjects}
                    weightings={formattedWeightings}
                    handleSubjectChoicesChange={(choice, value) => handleChange(choice, value)}
                    // Functions for reinstating subjects/weightings when deselected
                    reinstateSubject={(subject) => modifyAvailableSubjects(subject, false, availableSubjects)}
                    reinstateWeight={(weight) => modifyAvailableWeightings(weight, false, availableWeightings)}
                    // Only the choices up to minChoices are required
                    required={((choice - 1) < minChoices) ? true : false}
                    setFocusSet={e => setFocusSet(e)}
                    canFocus={canFocus} />
            )
            )}

            {/* Also render the backup option */}
            {/* TODO - backup option render only when weighting 3 is selected */}
            <BackupOption
                allChoices={allChoices}
                groupedSubjects={availableSubjects}
                handleSubjectChoicesChange={(choice, value) => handleChange(choice, value)}
                reinstateSubject={(subject) => modifyAvailableSubjects(subject, false, availableSubjects)}
                setFocusSet={e => setFocusSet(e)}
                canFocus={canFocus}
                backup_message={backup_message} />
        </Card>
    )
}