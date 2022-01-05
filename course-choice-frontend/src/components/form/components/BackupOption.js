import { SelectInput } from '../inputs';
import { useEffect, useReducer } from 'react';
import choiceReducer from '../../reducers/choiceReducer'

// has to send back choice object: { subject: '', level: '', weight: 0 }
export default function ChoiceRow({ choiceNo, allChoices, groupedSubjects, handleSubjectChoicesChange, reinstateSubject, reinstateWeight, required, setFocusSet, canFocus, last, backup_message }) {

    const [choice, dispatchChoice] = useReducer(
        choiceReducer,
        {
            return_choice: { subject: "", level: "", weight: "backup"},
            availableLevels: [],
            all_choices: allChoices,
            choice_no: choiceNo,
        },
    )
    const { return_choice, availableLevels } = choice;
    const { level } = return_choice;

    useEffect(() => {
        handleSubjectChoicesChange("backup", return_choice);
    }, [return_choice])

    return (
        <>
            <div className="my-2 flex items-center justify-center">
                <h5 className="flex flex-shrink-0 text-xl mr-10">
                    {`Backup Option`}
                    <p className={`text-red-600 ml-1`}>*</p>
                </h5>
                <p>{backup_message}</p>
                <div className="grid sm:grid-cols-2 w-full sm:gap-4">
                    <SelectInput
                        name=""
                        placeholder="Subject..."
                        options={groupedSubjects}
                        onChange={e => dispatchChoice({ type: 'SET_SELECTED_SUBJECT', payload: e.value })}
                        reinstate={(subject) => reinstateSubject(subject)}
                        required={required}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus}
                        isClearable={false} />
                    <SelectInput
                        name=""
                        placeholder="Level..."
                        value={level
                            ? { value: level, label: level }
                            : ""}
                        options={availableLevels}
                        onChange={e => dispatchChoice({ type: 'SET_SELECTED_LEVEL', payload: e.value })}
                        required={required}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus}
                        isClearable={false} />
                </div>
            </div>
        </>
    )
}