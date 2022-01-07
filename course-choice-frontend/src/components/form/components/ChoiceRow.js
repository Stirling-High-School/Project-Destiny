import { SelectInput } from '../inputs';
import { useEffect, useReducer } from 'react';
import choiceReducer from '../../reducers/choiceReducer'

// Renders a choice row
// handleSubjectChoicesChange is passed object in form: { subject: '', level: '', weight: 0 }
export default function ChoiceRow({ choiceNo, allChoices, groupedSubjects, weightings, handleSubjectChoicesChange, reinstateSubject, reinstateWeight, required, setFocusSet, canFocus }) {

    const [choice, dispatchChoice] = useReducer(
        choiceReducer,
        {
            return_choice: {
                subject: null,
                level: null,
                weight: null,
            },
            availableLevels: [],
            all_choices: allChoices,
            choice_no: choiceNo,
        },
    )
    const { return_choice, availableLevels } = choice;
    const { subject, level, weight } = return_choice;

    // TODO - Not the best fix in the world...
    // Runs handlSubjectChoicesChange when return_choice gets new values
    useEffect((choice = choiceNo, pls = handleSubjectChoicesChange) => {
        pls(choice - 1, return_choice);
    }, [return_choice])

    return (
        <>
            <div className="flex-col sm:flex-row flex items-center justify-center">
                {/* Choice number */}
                <h5 className="flex flex-shrink-0 text-xl mr-10">
                    {`Choice ${choiceNo}`}
                    {/* Display red * if required */}
                    <p className={`text-red-600 ml-1 ${required || "invisible"}`}>*</p>
                </h5>
                <div className="grid sm:grid-cols-3 w-full sm:gap-4">
                    {/* Subject input */}
                    <SelectInput
                        placeholder="Subject..."
                        value={subject ? { value: subject, label: subject } : ""}
                        options={groupedSubjects}
                        onChange={e => dispatchChoice({ type: 'SET_SELECTED_SUBJECT', payload: e ? e.value : null })}
                        reinstate={(subject) => reinstateSubject(subject)}
                        required={required}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus} />
                    {/* Level input */}
                    <SelectInput
                        placeholder="Level..."
                        value={level ? { value: level, label: level } : ""}
                        options={availableLevels}
                        onChange={e => dispatchChoice({ type: 'SET_SELECTED_LEVEL', payload: e ? e.value : null })}
                        required={required}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus} />
                    {/* Weighting input */}
                    <SelectInput
                        placeholder="Weighting..."
                        value={weight ? { value: weight.value, label: weight.label } : ""}
                        options={weightings}
                        onChange={e => dispatchChoice({ type: 'SET_SELECTED_WEIGHTING', payload: e ? e : null })}
                        required={required}
                        reinstate={(weight) => reinstateWeight(weight)}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus} />
                </div>
            </div>
        </>
    )
}