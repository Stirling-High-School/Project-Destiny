import SelectInput from '../inputs/SelectInput';
import { Card, FormHeading } from '../../reusable';

export default function PersonalDetails({ formClasses, handleFormClassChange, setFocusSet, canFocus }) {

    return (
        <Card>
            <FormHeading>Your Details</FormHeading>
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