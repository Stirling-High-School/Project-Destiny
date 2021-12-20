import { TextInput, SelectInput } from './inputs/index-inputs'
import Card from '../reusable/Card';

export default function PersonalDetails({ formClasses, profile, formValues, setFormValues }) {

    function handleFormClassChange(e) {
        formValues["data"].form_class = e.value
        setFormValues(formValues)
    }

    return (
        <Card>
            <h1 className="text-4xl">Personal Details</h1>
            <TextInput
                name="Name:"
                value={profile.name}
                disabled={true}
                type="text" />
            <TextInput
                name="Email address:"
                value={profile.email}
                disabled={true}
                type="text" />
            <SelectInput
                name="Form class:"
                options={formClasses.map(formClass => ({ value: formClass, label: formClass }))}
                required={true}
                onChange={e => handleFormClassChange(e)} />
        </Card>
    )
}