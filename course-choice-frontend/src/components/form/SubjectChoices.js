import ChoiceRow from './ChoiceRow';
import Card from '../reusable/Card';
import FormHeading from '../reusable/FormHeading';
import { useState } from 'react';

export default function SubjectChoices({ message, maxChoices, minChoices, allChoices, groupedSubjects, weightings, handleSubjectChoicesChange, setFocusSet, canFocus }) {

    let choices = []
    for (let x = 1; x <= maxChoices; x++) choices.push(x)

    const convertWeight = (weight) => {
        return {
            label: weight,
            value: weight,
            isDisabled: false
        }
    }

    const [availableSubjects, setAvailableSubjects] = useState(groupedSubjects);
    const [availableWeightings, setAvailableWeightings] = useState(weightings.map(convertWeight))

    const handleChange = (choice, value) => {
        handleSubjectChoicesChange(choice, value);

        if (value.weight) {
            console.log("modify weight")
            modifyAvailableWeightings(value.weight.value, true)
        } else if (value.subject) {
            modifyAvailableSubjects(value.subject, true)
        }
    }

    const modifyAvailableWeightings = (weight, disabled) => {
        let newWeightings = availableWeightings;
        for (let x = 0; x < newWeightings.length; x++) {
            if (newWeightings[x].value === weight) {
                if (newWeightings[x].isDisabled === !disabled) {
                    newWeightings[x].isDisabled = disabled;
                    break;
                }
            }
        }
        console.log("newWeightings")
        console.log(newWeightings)
        setAvailableWeightings(newWeightings);
    }

    const modifyAvailableSubjects = (subject, disabled) => {
        let newSubjects = availableSubjects;
        let department = newSubjects.find(department => {
            for (let x = 0; x < department["options"].length; x++) {
                if (subject === department["options"][x].label) return true
            }
            return false
        });
        console.log(department)
        if (department) {
            for (let x = 0; x < department["options"].length; x++) {
                if (subject === department["options"][x].label) {
                    department["options"][x].isDisabled = disabled;
                }
            }
            for (let x = 0; x < newSubjects.length; x++) {
                if (newSubjects[x].label === department.label) {
                    newSubjects[x] = department
                }
            }
            setAvailableSubjects(newSubjects)
        }
    }

    const formatWeightings = () => {
        let unique = availableWeightings.filter((x, i, arr) => arr.findIndex(y => y.value === x.value && y.isDisabled === x.isDisabled) === i);
        unique.sort(
            function (a, b) {
                if (a.label === b.label) {
                    if (a.isDisabled && b.isDisabled) {
                        return 0
                    } else if (a.isDisabled) {
                        return -1
                    } else {
                        return 1
                    }
                }
                return a.label > b.label ? 1 : -1;
            });
        unique = [...new Map(unique.map(weight => [weight.value, weight])).values()]
        return unique
    }

    return (
        <Card>
            <FormHeading>Course Choices</FormHeading>
            <p className="mb-6">{message}</p>
            {choices.map((choice, index) => {
                let last = false
                if ((choice) === choices.length) {
                    last = true
                }
                let required = false
                if ((choice - 1) < minChoices) {
                    required = true
                }
                return (
                    <ChoiceRow
                        key={index}
                        choiceNo={choice}
                        allChoices={allChoices}
                        groupedSubjects={availableSubjects}
                        weightings={formatWeightings()}
                        handleSubjectChoicesChange={(choice, value) => handleChange(choice, value)}
                        reinstateSubject={(subject) => modifyAvailableSubjects(subject, false)}
                        reinstateWeight={(weight) => modifyAvailableWeightings(weight, false)}
                        required={required}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus}
                        last={last} />
                )
            })}
        </Card>
    )
}