import SelectInput from '../inputs/SelectInput';
import TextInput from '../inputs/TextInput';
import { Card, FormHeading } from '../../reusable';

// Personal details form section, this includes form class, name and email
const PersonalDetails = ({ formClasses, handleFormClassChange, name, handleNameChange, email, handleEmailChange, setFocusSet, canFocus }) => (
    <Card>
        <FormHeading>Your Details</FormHeading>
        {/* Comment the below 2 text inputs out to just use details returned from google oauth, not allowing users to edit */}
        <TextInput
            name="Name"
            required={true}
            value={name}
            onChange={handleNameChange}
            setFocusSet={e => setFocusSet(e)}
            canFocus={canFocus}
        />
        <TextInput
            name="Email"
            required={true}
            value={email}
            onChange={handleEmailChange}
            setFocusSet={e => setFocusSet(e)}
            canFocus={canFocus}
        />
        <SelectInput
            name="Form class"
            options={formClasses.map(formClass => ({ value: formClass, label: formClass }))}
            required={true}
            onChange={handleFormClassChange}
            setFocusSet={e => setFocusSet(e)}
            canFocus={canFocus}
        />
    </Card>
)

export default PersonalDetails;