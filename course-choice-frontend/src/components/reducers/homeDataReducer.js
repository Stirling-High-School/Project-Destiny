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
                config: action.payload.config,
                courses: action.payload.courses,
            };
        case 'DATA_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorComponent: action.payload,
            };
        default:
            throw new Error();
    }
}