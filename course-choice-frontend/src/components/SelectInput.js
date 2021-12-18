import Form from 'react-bootstrap/Form'

const SelectInput = ({ options, label, id }) => (
    <Form.Group className="my-3" controlId={id}>
        {label ? <Form.Label>{label}</Form.Label> : ""}
        <Form.Select>
            <option key="placeholder" value="">Select...</option>
            {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </Form.Select>
    </Form.Group>
)

export default SelectInput