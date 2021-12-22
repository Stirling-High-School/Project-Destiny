import { useState, } from 'react';
import { toast } from 'react-toastify';

export default function LongTextInput({ name, type, description, required, onChange, value, disabled, setFocusSet, canFocus }) {

    const [error, setError] = useState(false)

    const handleChange = (e) => {
        setError(false)
        onChange(e)
        setFocusSet(false)
        toast.dismiss()
    }

    const handleInvalid = (e) => {
        setError(true)
        e.preventDefault()
        console.log(canFocus)
        if (canFocus) {
            console.log("focus")
            e.target.focus()
            setFocusSet(true)
            toast.error("Please fill out all required fields!")
        }
    }

    return (
        <div className="my-5">
            <label className="text-lg">
                {name}
                {required &&
                    <span className="text-red-600"> *</span>}
            </label><br />
            {description &&
                <p className="text-sm text-grey">{description}</p>}
            <textarea
                onInvalid={handleInvalid}
                disabled={disabled}
                value={value}
                id={name}
                name={name}
                onChange={handleChange}
                className={`my-2 p-2 shadow-sm rounded h-32 min-w-full border border-gray-300 ${error ? "ring-red-600 ring-2 outline-none border-transparent focus:ring-red-600" : "focus:ring-blue-500"} focus:ring-2 focus:outline-none focus:border-transparent`}
                type={type}
                required={required}
            />
            {error &&
                <p className="text-sm text-red-600">{name} is required!</p>}
        </div>
    )
}