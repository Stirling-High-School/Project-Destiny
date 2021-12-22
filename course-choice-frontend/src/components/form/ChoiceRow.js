import { SelectInput } from './inputs/index-inputs';
import { useEffect, useReducer } from 'react';

function choiceReducer(state, action) {
    switch (action.type) {
        case 'SET_SELECTED_SUBJECT':
            let subjectObject = state["all_choices"].find(subjectObj => subjectObj.subject === action.payload);
            let levels = subjectObject["levels"].map(level => ({ value: level.display_name, label: level.display_name }));
            return {
                ...state,
                return_choice: { ...state.return_choice, subject: action.payload },
                availableLevels: levels,
            };
        case 'SET_SELECTED_LEVEL':
            return {
                ...state,
                return_choice: { ...state.return_choice, level: action.payload },
            };
        case 'SET_SELECTED_WEIGHTING':
            return {
                ...state,
                return_choice: { ...state.return_choice, weight: action.payload },
            };
        default:
            throw new Error();
    }
}

// has to send back choice object: { subject: '', level: '', weight: 0 }
export default function ChoiceRow({ choiceNo, allChoices, groupedSubjects, weightings, handleSubjectChoicesChange, required, setFocusSet, canFocus, last }) {

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
                        required={required}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus} />
                    <SelectInput
                        name=""
                        placeholder="Level..."
                        value={level
                            ? { value: level, label: level }
                            : null}
                        options={availableLevels}
                        onChange={e => dispatchChoice({ type: 'SET_SELECTED_LEVEL', payload: e.value })}
                        required={required}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus} />
                    <SelectInput
                        name=""
                        placeholder="Weighting..."
                        options={weightings.map(weighting => ({ value: weighting, label: weighting }))}
                        onChange={e => dispatchChoice({ type: 'SET_SELECTED_WEIGHTING', payload: e.value })}
                        required={required}
                        setFocusSet={e => setFocusSet(e)}
                        canFocus={canFocus} />
                </div>
            </div>
            {last || <hr />}
        </>
    )
}