import { SelectInput } from "../inputs";
import { useEffect, useReducer } from "react";
import choiceReducer from "../../reducers/choiceReducer";

// Renders the backup option
// handleSubjectChoicesChange is passed object in form: { subject: '', level: '', weight: 0 }
export default function ChoiceRow({
    allChoices,
    groupedSubjects,
    handleSubjectChoicesChange,
    reinstateSubject,
    setFocusSet,
    canFocus,
    backup_message,
    maxChoices
}) {
    const [choice, dispatchChoice] = useReducer(choiceReducer, {
        return_choice: {
            subject: null,
            level: null,
            weight: { label: "Backup" },
        },
        availableLevels: [],
        all_choices: allChoices,
    });
    const { return_choice, availableLevels } = choice;
    const { subject, level } = return_choice;

    // Runs handlSubjectChoicesChange when return_choice gets new values
    useEffect(() => {
        handleSubjectChoicesChange(maxChoices, return_choice);
    }, [return_choice]);

    return (
        <>
            <hr />
            {/* Backup message text */}
            <p className="my-4">{backup_message}</p>

            <div className="flex-col sm:flex-row flex items-center justify-center">
                {/* Backup option text */}
                <h5 className="flex flex-shrink-0 text-xl mr-10">
                    {`Backup Option`}

                    {/* Display red * (required) */}
                    <p className={`text-red-600 ml-1`}>*</p>
                </h5>

                <div className="grid sm:grid-cols-2 w-full sm:gap-4">
                    {/* Subject input */}
                    <SelectInput
                        placeholder="Subject..."
                        value={
                            subject ? { value: subject, label: subject } : ""
                        }
                        options={groupedSubjects}
                        onChange={(e) =>
                            dispatchChoice({
                                type: "SET_SELECTED_SUBJECT",
                                payload: e ? e.value : null,
                            })
                        }
                        reinstate={(subject) => reinstateSubject(subject)}
                        required={true}
                        setFocusSet={(e) => setFocusSet(e)}
                        canFocus={canFocus}
                    />
                    {/* Level input */}
                    <SelectInput
                        placeholder="Level..."
                        value={level ? { value: level, label: level } : ""}
                        options={availableLevels}
                        onChange={(e) =>
                            dispatchChoice({
                                type: "SET_SELECTED_LEVEL",
                                payload: e ? e.value : null,
                            })
                        }
                        required={true}
                        setFocusSet={(e) => setFocusSet(e)}
                        canFocus={canFocus}
                    />
                </div>
            </div>
        </>
    );
}
