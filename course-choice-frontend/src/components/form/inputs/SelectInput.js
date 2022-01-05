import Select, { components } from 'react-select';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function SelectInput({ name, placeholder, options, description, required, onChange, reinstate, value, setFocusSet, canFocus }) {

    const [error, setError] = useState(false);
    const selectRef = useRef();

    // TODO - this also displays for inputs other than level
    // Message when no options are available in drop-down
    const NoOptionsMessage = (props) => (
        <components.NoOptionsMessage {...props}>
            Select a subject to see available levels...
        </components.NoOptionsMessage>
    )

    // Custom styleObject for react-select input component for error
    const styleObject = {
        control: (base, state) => ({
            ...base,
            boxShadow: `0 0 0 2px 'red'`,
            borderColor: 'red',
            borderWidth: '2px',
            '&:hover': {
                boxShadow: `0 0 0 2px 'red'`,
                borderColor: 'red',
                borderWidth: '2px'
            }
        })
    };

    const handleChange = (selected) => {
        // Reinstate option to make it available again (for weightings and subjects)
        let label = value ? value.label : ""
        if (reinstate) reinstate(label)

        // Reset any invalid errors
        toast.dismiss()
        setError(false)
        setFocusSet(false)

        // Set new value
        onChange(selected)
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
        <div className="my-2 sm:my-3">

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

            {/* react-select input component */}
            <Select
                className="my-2 shadow-sm"
                id={name}
                name={name}
                ref={selectRef}
                placeholder={placeholder}
                components={{ NoOptionsMessage }}
                options={options}
                value={value}
                isClearable={true}
                onChange={handleChange}
                styles={error && styleObject} />

            {/* If required, we need a hidden input field to trigger function when the form is submitted */}
            {required && (
                <input
                    onInvalid={handleInvalid}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{
                        opacity: 0,
                        width: "100%",
                        height: 0,
                        position: "absolute"
                    }}
                    value={value}
                    onChange={() => { }}
                    onFocus={() => (selectRef.current.focus())}
                    required={required}
                />
            )}

            {/* Error message */}
            {error &&
                <p className="text-sm text-red-600">
                    {name
                        ? <span>{name} is required!</span>
                        : <span>This field is required!</span>}
                </p>}
        </div>
    )
}