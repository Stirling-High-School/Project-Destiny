export default function choiceReducer(state, action) {
    switch (action.type) {
        // Set the selected subject, generate an array of avaiable levels for the chosen subject
        case 'SET_SELECTED_SUBJECT':
            let subjectObject = state["all_choices"].find(subjectObj => subjectObj.subject === action.payload);
            let levels = subjectObject ? subjectObject["levels"].map(level => ({ value: level.display_name, label: level.display_name, isDisabled: false })) : []
            return {
                ...state,
                return_choice: { ...state.return_choice, subject: action.payload, level: null },
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
        // Throw an error if none of the above
        default:
            throw new Error();
    }
}