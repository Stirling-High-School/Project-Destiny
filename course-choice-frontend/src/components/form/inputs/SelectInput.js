import Select, { components } from 'react-select';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function SelectInput({ name, placeholder, options, description, required, onChange, reinstate, value = "", setFocusSet, canFocus, isClearable }) {

    const selectRef = useRef();
    const [currentValue, setCurrentValue] = useState(value);
    const [error, setError] = useState(false)

    // TODO - this also displays for inputs other than level
    const NoOptionsMessage = (props) => (
        <components.NoOptionsMessage {...props}>
            Select a subject to see available levels...
        </components.NoOptionsMessage>
    )

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

    const handleChange = (selected = "", { action }) => {
        // if (action === "clear") {
        //     handleClear(selected)
        // }

        let label = "";
        if (currentValue) {
            label = currentValue.label
        }

        console.log("onchange")
        console.log(label)

        if (reinstate) {
            reinstate(label)
        }

        setError(false)
        setFocusSet(false)
        onChange(selected)
        setCurrentValue(selected)
    }

    const handleInvalid = (e) => {
        setError(true)
        e.preventDefault()
        if (canFocus) {
            e.target.focus()
            setFocusSet(true)
            toast.error("Please fill out all required fields!")
        }
    }

    return (
        <div className="my-2 sm:my-3">
            {name &&
                <>
                    <label className="text-lg">
                        {name + ":"}
                        {required &&
                            <span className="text-red-600"> *</span>}
                    </label>
                    <br />
                </>}
            {description &&
                <p className="text-sm text-grey">{description}</p>}
            <Select
                className="my-2 shadow-sm"
                id={name}
                name={name}
                ref={selectRef}
                placeholder={placeholder}
                components={{ NoOptionsMessage }}
                options={options}
                value={currentValue}
                isClearable={isClearable}
                onChange={handleChange}
                styles={error && styleObject} />
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
                    value={currentValue}
                    onChange={() => { }}
                    onFocus={() => (selectRef.current.focus())}
                    required={required}
                />
            )}
            {error &&
                <p className="text-sm text-red-600">
                    {name
                        ? <span>{name} is required!</span>
                        : <span>This field is required!</span>}
                </p>}
        </div>
    )
}