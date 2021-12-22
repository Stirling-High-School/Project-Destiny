export default function submittedReducer(state, action) {
    switch (action.type) {
        case 'SUBMIT_INIT':
            return {
                ...state,
                isSubmitting: true,
                isSubmitError: false,
            };
        case 'SUBMIT_SUCCESS':
            return {
                ...state,
                isSubmitting: false,
                isSubmitError: false,
                isSubmitted: true,
            };
        case 'SUBMIT_FAILURE':
            return {
                ...state,
                isSubmitting: false,
                isSubmitError: true
            };
        default:
            throw new Error();
    }
}