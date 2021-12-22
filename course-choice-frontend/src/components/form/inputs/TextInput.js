import { useState } from 'react';
import { toast } from 'react-toastify';

export default function TextInput({ name, type, description, required, onChange, value, disabled, setFocusSet, canFocus }) {

    const [error, setError] = useState(false)

    const handleChange = (e) => {
        setError(false)
        onChange(e)
        setFocusSet(false)
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
            <input
                onInvalid={handleInvalid}
                disabled={disabled}
                value={value}
                id={name}
                name={name}
                onChange={handleChange}
                className={`my-2 p-2 shadow-sm rounded h-10 min-w-full border-gray-300 border-2 ${error ? "border-red-600 outline-none" : "focus:border-blue-500"} focus:outline-none`}
                type={type}
                required={required}
            />
            {error &&
                <p className="text-sm text-red-600">{name} is required!</p>}
        </div>
    )
}