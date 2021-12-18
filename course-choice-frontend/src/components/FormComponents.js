import Form from 'react-bootstrap/Form'
import Select from 'react-select'

export function SelectInput({ name, options, description, required, onChange }) {
    return (
        <Form.Group className="my-3" controlId={"formQuestion" + name}>
            <Form.Label>{name}</Form.Label><br />
            {description &&
                <Form.Text className="text-muted">{description}</Form.Text>}
            <Select options={options} onChange={e => onChange(e.value)} />
        </Form.Group>
    )
}

export function TextInput({ name, type, description, required }) {
    return (
        <Form.Group className="my-3" controlId={"formQuestion" + name}>
            <Form.Label>{name}</Form.Label><br />
            {description &&
                <Form.Text className="text-muted">{description}</Form.Text>}
            <Form.Control className="mt-2" type={type} required={required} />
        </Form.Group>
    )
}

export function LongTextInput({ name, type, description, required }) {
    return (
        <Form.Group className="my-3" controlId={"formQuestion" + name}>
            <Form.Label>{name}</Form.Label><br />
            {description &&
                <Form.Text className="text-muted">{description}</Form.Text>}
            <Form.Control as="textarea" rows={3} className="mt-2" type={type} required={required} />
        </Form.Group>
    )
}


