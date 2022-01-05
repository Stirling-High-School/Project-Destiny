import { useState, } from 'react';
import { toast } from 'react-toastify';

export default function LongTextInput({ name, type, description, required, onChange, value, disabled, setFocusSet, canFocus }) {

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
                    <label className="text-lg">
                        {name + ":"}

                        {/* Display red * if required */}
                        {required &&
                            <span className="text-red-600"> *</span>}
                    </label>
                    <br />
                </>}

            {/* Display description if provided */}
            {description &&
                <p className="text-sm text-grey">{description}</p>}

            {/* Input component */}
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

            {/* Error message */}
            {error &&
                <p className="text-sm text-red-600">{name} is required!</p>}
        </div>
    )
}