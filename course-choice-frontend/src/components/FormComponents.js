import Select, { components } from 'react-select'

export function SelectInput({ name, options, description, required, onChange, value }) {

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

export function TextInput({ name, type, description, required, onChange, value, disabled }) {
    return (
        <div className="my-5">
            <label className="text-lg">{name}</label><br />
            {description &&
                <p className="text-sm text-grey">{description}</p>}
            <input disabled={disabled} value={value} id={name} name={name} onChange={onChange} className="mt-2 p-2 shadow-sm rounded h-10 min-w-full border border-gray-300 focus:ring-blue-500 focus:ring-2 focus:outline-none focus:border-transparent" type={type} required={required} />
        </div>
    )
}

export function LongTextInput({ name, type, description, required, onChange }) {
    return (
        <div className="my-3">
            <label className="text-lg">{name}</label><br />
            {description &&
                <p className="text-sm text-grey">{description}</p>}
            <textarea className="mt-2 p-2 shadow-sm rounded h-32 min-w-full border border-gray-300 focus:ring-blue-500 focus:ring-2 focus:outline-none focus:border-transparent" style={{ resize: "vertical" }} id={name} name={name} onChange={onChange} type={type} required={required} />
        </div>
    )
}


