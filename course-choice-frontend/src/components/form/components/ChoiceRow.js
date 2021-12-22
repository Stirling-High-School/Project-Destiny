import { SelectInput } from '../inputs';
import { useEffect, useReducer } from 'react';
import choiceReducer from '../../reducers/choiceReducer'

// has to send back choice object: { subject: '', level: '', weight: 0 }
export default function ChoiceRow({ choiceNo, allChoices, groupedSubjects, weightings, handleSubjectChoicesChange, reinstateSubject, reinstateWeight, required, setFocusSet, canFocus, last }) {

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
    const { level } = return_choice;

    // Not the best fix in the world...
    useEffect((choice = choiceNo, pls = handleSubjectChoicesChange) => {
        pls(choice - 1, return_choice);
    }, [return_choice])

    const weightChange = (weight = "") => {
        dispatchChoice({ type: 'SET_SELECTED_WEIGHTING', payload: weight })
    }

    return (
        <>
            <div className="my-2 flex items-center justify-center">
                <h5 className="flex flex-shrink-0 text-xl mr-10">
                    {`Choice ${choiceNo}`}
                    <p className={`text-red-600 ml-1 ${required || "invisible"}`}>*</p>
                </h5>
                <div className="grid sm:grid-cols-3 w-full sm:gap-4">
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
                    <SelectInput
                        name=""
                        placeholder="Weighting..."
                        options={weightings}
                        onChange={e => weightChange(e.value)}
                        required={required}
                        reinstate={(weight) => reinstateWeight(weight)}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus}
                        isClearable={true} />
                </div>
            </div>
            {last || <hr />}
        </>
    )
}