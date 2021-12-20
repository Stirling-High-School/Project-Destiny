export default function TextInput({ name, type, description, required, onChange, value, disabled }) {
    return (
        <div className="my-5">
            <label className="text-lg">{name}</label><br />
            {description &&
                <p className="text-sm text-grey">{description}</p>}
            <input disabled={disabled} value={value} id={name} name={name} onChange={onChange} className="mt-2 p-2 shadow-sm rounded h-10 min-w-full border border-gray-300 focus:ring-blue-500 focus:ring-2 focus:outline-none focus:border-transparent" type={type} required={required} />
        </div>
    )
}