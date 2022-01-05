import { SelectInput } from '../inputs';
import { useEffect, useReducer } from 'react';
import choiceReducer from '../../reducers/choiceReducer'

// Renders the backup option
// handleSubjectChoicesChange is passed object in form: { subject: '', level: '', weight: 0 }
export default function ChoiceRow({ allChoices, groupedSubjects, handleSubjectChoicesChange, reinstateSubject, setFocusSet, canFocus, backup_message }) {

    const [choice, dispatchChoice] = useReducer(
        choiceReducer,
        {
            return_choice: {
                subject: null,
                level: null,
                weight: "backup",
            },
            availableLevels: [],
            all_choices: allChoices,
        },
    )
    const { return_choice, availableLevels } = choice;
    const { subject, level } = return_choice;

    // Runs handlSubjectChoicesChange when return_choice gets new values
    useEffect(() => {
        handleSubjectChoicesChange("backup", return_choice);
    }, [return_choice])

    return (
        <>
            <div className="my-2 flex items-center justify-center">

                {/* Backup option text */}
                <h5 className="flex flex-shrink-0 text-xl mr-10">
                    {`Backup Option`}
                    
                    {/* Display red * if required */}
                    <p className={`text-red-600 ml-1`}>*</p>
                </h5>

                {/* Backup message text */}
                <p>{backup_message}</p>

                <div className="grid sm:grid-cols-2 w-full sm:gap-4">
                    {/* Subject input */}
                    <SelectInput
                        name=""
                        value={subject ? { value: subject, label: subject } : null}
                        placeholder="Subject..."
                        options={groupedSubjects}
                        onChange={e => dispatchChoice({ type: 'SET_SELECTED_SUBJECT', payload: e.value })}
                        reinstate={(subject) => reinstateSubject(subject)}
                        required={true}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus} />
                    {/* Level input */}
                    <SelectInput
                        name=""
                        placeholder="Level..."
                        value={level ? { value: level, label: level } : null}
                        options={availableLevels}
                        onChange={e => dispatchChoice({ type: 'SET_SELECTED_LEVEL', payload: e.value })}
                        required={true}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus} />
                </div>
            </div>
        </>
    )
}