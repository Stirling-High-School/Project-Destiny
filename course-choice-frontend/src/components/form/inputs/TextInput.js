import { useState } from 'react';
import { toast } from 'react-toastify';

export default function TextInput({ name, type, description, required, onChange, value, disabled, setFocusSet, canFocus }) {

    const [error, setError] = useState(false)

    const handleChange = (e) => {
        // Reset any invalid errors
        setError(false)
        toast.dismiss()
        setFocusSet(false)

        // Set new value
        onChange(e)
    }

    const handleInvalid = (e) => {
        // Set error and prevent default browser behaviour
        setError(true)
        e.preventDefault()

        // If this input is first (determined further up component tree), set focus and send toast
        if (canFocus) {
            e.target.focus()
            setFocusSet(true)
            toast.error("Please fill out all required fields!")
        }
    }

    return (
        <div className="my-5">

            {/* Display name if provided */}
            {name &&
                <>
                    <label className={`text-lg ${required && 'required'}`}>
                        {name + ":"}
                    </label>
                    <br />
                </>}

            {/* Display description if provided */}
            {description &&
                <p className="text-sm text-grey">{description}</p>}

            {/* Input component */}
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

            {/* Error message */}
            {error &&
                <p className="text-sm text-red-600">{name} is required!</p>}
        </div>
    )
}