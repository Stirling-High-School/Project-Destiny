import ChoiceRow from './ChoiceRow';
import Card from '../reusable/Card';
import FormHeading from '../reusable/FormHeading';

export default function SubjectChoices({ message, maxChoices, minChoices, allChoices, groupedSubjects, weightings, handleSubjectChoicesChange, setFocusSet, canFocus }) {

    let choices = []
    for (let x = 1; x <= maxChoices; x++) choices.push(x)

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
                if ((choice-1) < minChoices) {
                    required = true
                }
                return (
                    <ChoiceRow
                        key={index}
                        choiceNo={choice}
                        allChoices={allChoices}
                        groupedSubjects={groupedSubjects}
                        weightings={weightings}
                        handleSubjectChoicesChange={(choice, value) => handleSubjectChoicesChange(choice, value)} 
                        required={required}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus}
                        last={last} />
                )
            })}
        </Card>
    )
}