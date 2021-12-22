import { SelectInput } from './inputs/index-inputs'
import Card from '../reusable/Card';
import FormHeading from '../reusable/FormHeading';

export default function PersonalDetails({ formClasses, handleFormClassChange, setFocusSet, canFocus }) {

    return (
        <Card>
            <FormHeading>Your Details</FormHeading>
            {/* <TextInput
                name="Name:"
                value={name}
                disabled={true}
                type="text" />
            <TextInput
                name="Email address:"
                value={email}
                disabled={true}
                type="text" /> */}
            <SelectInput
                name="Form class"
                options={formClasses.map(formClass => ({ value: formClass, label: formClass }))}
                required={true}
                onChange={handleFormClassChange}
                setFocusSet={e => setFocusSet(e)}
                canFocus={canFocus}
                isClearable={false}
            />
        </Card>
    )
}