import SelectInput from '../inputs/SelectInput';
import { Card, FormHeading } from '../../reusable';
import { useState } from 'react';
import modifyAvailableOptions from '../../functions/modifyAvailableOptions';

export default function WiderAchievementOptions({ wider_achievement_options, wider_achievement_choice_count, handleWiderAchievementChange, message, setFocusSet, canFocus }) {

    const [options, setOptions] = useState([Array.from({length: wider_achievement_choice_count}, (_, i) => "")]);

    const [availableOptions, setAvailableOptions] = useState(wider_achievement_options.map(option => ({ value: option, label: option, isDisabled: false })));

    const handleOptionChange = (e, index) => {
        const value = e ? e.value : "";
        const newAvailableOptions = modifyAvailableOptions(value, true, availableOptions);
        setAvailableOptions(newAvailableOptions);
        let newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
        handleWiderAchievementChange(newOptions);
    }

    return (
        <Card>
            <FormHeading>Wider Achievement</FormHeading>
            <p>{message}</p>
            <div className="grid sm:grid-cols-2 sm:gap-10">
                {
                    [...Array(wider_achievement_choice_count).keys()].map((_, index) => (<SelectInput
                        key={`Choice ${index+1}`}
                        name={`Choice ${index+1}`}
                        value={options ? { value: options[index], label: options[index] } : ""}
                        options={availableOptions}
                        required={false}
                        onChange={e => handleOptionChange(e, index)}
                        setFocusSet={e => setFocusSet(e)}
                        reinstate={value => modifyAvailableOptions(value, false, availableOptions)}
                        canFocus={canFocus}
                    />))
                }
            </div>
        </Card>
    )
}