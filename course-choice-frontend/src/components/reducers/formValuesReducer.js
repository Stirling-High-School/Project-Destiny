export default function formValuesReducer(state, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                data: { ...state.data, name: action.payload },
            }
        case 'SET_EMAIL':
            return {
                ...state,
                data: { ...state.data, email: action.payload },
            }
        case 'SET_FORM_CLASS':
            return {
                ...state,
                data: { ...state.data, form_class: action.payload },
            }
        case 'SET_CHOICES':
            return {
                ...state,
                data: { ...state.data, choices: action.payload },
            }
        case 'SET_ADDITIONAL_FIELDS':
            return {
                ...state,
                data: { ...state.data, optional_fields: action.payload },
            }
        default:
            throw new Error();
    }
}