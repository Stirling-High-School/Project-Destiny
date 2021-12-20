import { TextInput, LongTextInput, SelectInput } from './inputs/index-inputs';
import { useState } from 'react';
import Card from '../reusable/Card';

export default function AdditionalFields({ additional_fields, formValues, setFormValues }) {

    const [additionalFieldValues, setAdditionalFieldValues] = useState({})

    function handleChange(e) {
        let newAdditionalFields = additionalFieldValues
        newAdditionalFields[e.target.name] = e.target.value
        setAdditionalFieldValues(newAdditionalFields)
        formValues["data"]["optional_fields"] = additionalFieldValues
        setFormValues(formValues)
    }

    function handleChangeSelect(e, name) {
        let newAdditionalFields = additionalFieldValues
        newAdditionalFields[name] = e.value
        setAdditionalFieldValues(newAdditionalFields)
        formValues["data"]["optional_fields"] = additionalFieldValues
        setFormValues(formValues)
    }

    return (
        <Card>
            <h1 className="text-4xl">Additional Fields</h1>
            {additional_fields.map(({ name, description, type, options, required }, index) => {

                if (type === "text") {
                    return <TextInput
                        key={index}
                        name={name}
                        type="text"
                        description={description}
                        required={required}
                        onChange={handleChange} />
                } else if (type === "long_text") {
                    return <LongTextInput
                        key={index}
                        name={name}
                        type="text"
                        description={description}
                        required={required}
                        onChange={handleChange} />
                } else if (type === "restricted_choice") {
                    return <SelectInput
                        key={index}
                        name={name}
                        description={description}
                        options={options.map(option => ({ value: option, label: option }))}
                        required={required}
                        onChange={handleChangeSelect} />
                } else {
                    throw new Error ("Invalid additional field type: " + type)
                }

            })}
        </Card>
    )
}