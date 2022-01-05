import SelectInput from '../inputs/SelectInput';
import { Card, FormHeading } from '../../reusable';
import { useState } from 'react';
import modifyAvailableOptions from '../../functions/modifyAvailableOptions';

export default function WiderAchievementOptions({ wider_achievement_options, handleWiderAchievementChange, message, setFocusSet, canFocus }) {

    const [option1, setOption1] = useState()
    const [option2, setOption2] = useState()
    const [availableOptions, setAvailableOptions] = useState(wider_achievement_options.map(option => ({ value: option, label: option, isDisabled: false })));

    const handleOption1 = (e) => {
        const newAvailableOptions = modifyAvailableOptions(e ? e.value : "", true, availableOptions)
        setAvailableOptions(newAvailableOptions)
        setOption1(e)
        handleWiderAchievementChange([e, option2])
    }

    const handleOption2 = (e) => {
        const newAvailableOptions = modifyAvailableOptions(e ? e.value : "", true, availableOptions)
        setAvailableOptions(newAvailableOptions)
        setOption2(e)
        handleWiderAchievementChange([option1, e])
    }

    return (
        <Card>
            <FormHeading>Wider Achievement</FormHeading>
            <p>{message}</p>
            <div className="grid sm:grid-cols-2 sm:gap-10">
                <SelectInput
                    name="Choice 1"
                    value={option1}
                    options={availableOptions}
                    required={true}
                    onChange={e => handleOption1(e)}
                    setFocusSet={e => setFocusSet(e)}
                    reinstate={value => modifyAvailableOptions(value, false, availableOptions)}
                    canFocus={canFocus}
                />
                <SelectInput
                    name="Choice 2"
                    value={option2}
                    options={availableOptions}
                    required={true}
                    onChange={e => handleOption2(e)}
                    setFocusSet={e => setFocusSet(e)}
                    reinstate={value => modifyAvailableOptions(value, false, availableOptions)}
                    canFocus={canFocus}
                />
            </div>
        </Card>
    )
}