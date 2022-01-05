import groupSubjects from '../functions/groupSubjects';
import { useMemo } from 'react';
import { AdditionalFields, FormClass, CourseChoices, Submit } from './components'

// Renders the form sections
export default function ActualForm({ fetchData, submitForm, focusSet, setFocusSet, handleFormClassChange, handleSubjectChoicesChange, handleAdditionalFieldChange }) {
    
    // Deconstruct data form fetchData for readability
    const { choices_data, optional_fields_data, config, form_class_options } = fetchData;

    return (
        <form onSubmit={e => submitForm(e)}>
            {/* Form class section */}
            <FormClass
                formClasses={form_class_options}
                handleFormClassChange={handleFormClassChange}
                setFocusSet={e => (setFocusSet(e))}
                canFocus={!focusSet}
            />
            {/* Course choices section */}
            <CourseChoices
                message={config.subject_choice_message}
                maxChoices={config.max_choices}
                minChoices={config.min_choices}
                allChoices={choices_data}
                // Send grouped subjects. useMemo to reduce unnecessary renders...
                groupedSubjects={useMemo(() => groupSubjects(choices_data), [choices_data])}
                weightings={config.weightings}
                handleSubjectChoicesChange={(choice, value) => handleSubjectChoicesChange(choice, value)}
                setFocusSet={e => setFocusSet(e)}
                canFocus={!focusSet}
                backup_message={config.backup_message}
            />
            {/* Additional fields section */}
            <AdditionalFields
                title={config.optional_fields_title}
                message={config.optional_fields_message}
                additional_fields={optional_fields_data}
                handleAdditionalFieldChange={(field, value) => handleAdditionalFieldChange(field, value)}
                setFocusSet={e => setFocusSet(e)}
                canFocus={!focusSet}
            />
            {/* Submit button + message */}
            <Submit message={config.submit_message} />
        </form>
    )
}