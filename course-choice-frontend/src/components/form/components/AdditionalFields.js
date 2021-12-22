import { TextInput, LongTextInput, SelectInput } from '../inputs';
import { Card, FormHeading } from '../../reusable';

export default function AdditionalFields({ title, message, additional_fields, handleAdditionalFieldChange, setFocusSet, canFocus }) {
    return (
        <Card>
            <FormHeading>{title}</FormHeading>
            <p>{message}</p>
            {additional_fields.map(({ name, description, type, options, required }, index) => {
                switch (type) {
                    case "text":
                        return (
                            <TextInput
                                key={index}
                                name={name}
                                type="text"
                                description={description}
                                required={required}
                                onChange={e => handleAdditionalFieldChange(e.target.name, e.target.value)}
                                setFocusSet={e => setFocusSet(e)}
                                canFocus={canFocus} />
                        )
                    case "long_text":
                        return (
                            <LongTextInput
                                key={index}
                                name={name}
                                type="text"
                                description={description}
                                required={required}
                                onChange={e => handleAdditionalFieldChange(e.target.name, e.target.value)}
                                setFocusSet={e => setFocusSet(e)}
                                canFocus={canFocus} />
                        )
                    case "restricted_choice":
                        return (
                            <SelectInput
                                key={index}
                                name={name}
                                description={description}
                                options={options.map(option => ({ value: option, label: option }))}
                                required={required}
                                onChange={e => handleAdditionalFieldChange(name, e.value)}
                                setFocusSet={e => setFocusSet(e)}
                                canFocus={canFocus} />
                        )
                    default:
                        throw new Error(`Invalid optional field type: ${type}`)
                }
            })}
        </Card>
    )
}