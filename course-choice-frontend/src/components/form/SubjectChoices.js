import ChoiceRow from './ChoiceRow';
import Card from '../reusable/Card';

export default function SubjectChoices({ maxChoices, minChoices, allChoices, groupedSubjects, weightings, formValues, setFormValues }) {

    let choices = []
    for (let x = 1; x <= maxChoices; x++) choices.push(x)

    return (
        <Card>
            <h3 className="mb-5 text-4xl">Your Course Choices</h3>
            {choices.map((choice, index) => (
                <ChoiceRow
                    key={index}
                    choiceNo={choice}
                    allChoices={allChoices}
                    groupedSubjects={groupedSubjects}
                    weightings={weightings}
                    formValues={formValues}
                    setFormValues={e => setFormValues(e)} />
            ))}
        </Card>
    )
}