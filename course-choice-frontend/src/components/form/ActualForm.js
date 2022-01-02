import groupSubjects from '../functions/groupSubjects';
import { useMemo } from 'react';
import { AdditionalFields, PersonalDetails, SubjectChoices, Submit } from './components'

export default function ActualForm({ fetchData, submitForm, focusSet, setFocusSet, handleFormClassChange, handleSubjectChoicesChange, handleAdditionalFieldChange }) {
    const { choices_data, optional_fields_data, config, form_class_options } = fetchData;

    return (
        <form onSubmit={e => submitForm(e)} className="mx-8 md:mx-14 lg:mx-24 my-10">
            <PersonalDetails
                formClasses={form_class_options}
                handleFormClassChange={handleFormClassChange}
                setFocusSet={e => (setFocusSet(e))}
                canFocus={!focusSet}
            />
            <SubjectChoices
                message={config.subject_choice_message}
                maxChoices={config.max_choices}
                minChoices={config.min_choices}
                allChoices={choices_data}
                groupedSubjects={useMemo(() => groupSubjects(choices_data), [choices_data])}
                weightings={config.weightings}
                handleSubjectChoicesChange={(choice, value) => handleSubjectChoicesChange(choice, value)}
                setFocusSet={e => setFocusSet(e)}
                canFocus={!focusSet}
            />
            <AdditionalFields
                title={config.optional_fields_title}
                message={config.optional_fields_message}
                additional_fields={optional_fields_data}
                handleAdditionalFieldChange={(field, value) => handleAdditionalFieldChange(field, value)}
                setFocusSet={e => setFocusSet(e)}
                canFocus={!focusSet}
            />
            <Submit message={config.submit_message} />
        </form>
    )
}