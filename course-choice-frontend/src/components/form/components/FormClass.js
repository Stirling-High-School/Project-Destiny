import SelectInput from '../inputs/SelectInput';
import { Card, FormHeading } from '../../reusable';

// Form class form section
const FormClass = ({ formClasses, handleFormClassChange, setFocusSet, canFocus }) => (
    <Card>
        <FormHeading>Your Details</FormHeading>
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

export default FormClass;