export default function LongTextInput({ name, type, description, required, onChange }) {
    return (
        <div className="my-3">
            <label className="text-lg">{name}</label><br />
            {description && <p className="text-sm text-grey">{description}</p>}
            <textarea className="mt-2 p-2 shadow-sm rounded h-32 min-w-full border border-gray-300 focus:ring-blue-500 focus:ring-2 focus:outline-none focus:border-transparent"
                style={{ resize: "vertical" }}
                id={name}
                name={name}
                onChange={onChange}
                type={type}
                required={required} />
        </div>
    )
}