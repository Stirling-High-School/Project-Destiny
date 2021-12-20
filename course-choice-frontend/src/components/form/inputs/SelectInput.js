import Select, { components } from 'react-select'

export default function SelectInput({ name, options, description, required, onChange, value }) {

    const NoOptionsMessage = (props) => (
        <components.NoOptionsMessage {...props}>
            Select a subject to see available levels...
        </components.NoOptionsMessage>
    )

    return (
        <div className="my-2 sm:my-3">
            <label className="text-lg">{name}</label><br />
            {description &&
                <p className="text-sm text-grey">{description}</p>}
            <Select className="my-2 shadow-sm" id={name} name={name} components={{ NoOptionsMessage }} options={options} value={value} onChange={e => onChange(e, name)} />
        </div>
    )
}