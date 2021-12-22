export default function fetchDataReducer(state, action) {
    switch (action.type) {
        case 'DATA_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'DATA_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                choices_data: action.payload.choices,
                optional_fields_data: action.payload.additional_fields,
                config: action.payload.config,
                form_class_options: action.payload.form_class_options,
            };
        case 'DATA_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorComponent: action.payload,
            };
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.payload,
            }
        default:
            throw new Error();
    }
}