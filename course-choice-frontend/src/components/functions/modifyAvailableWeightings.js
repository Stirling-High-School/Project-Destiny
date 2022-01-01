const modifyAvailableWeightings = (weight, disabled, availableWeightings) => {
    for (let x = 0; x < availableWeightings.length; x++) {
        if (availableWeightings[x].value === weight) {
            if (availableWeightings[x].isDisabled === !disabled) {
                availableWeightings[x].isDisabled = disabled;
                break;
            }
        }
    }
    return availableWeightings;
}

export default modifyAvailableWeightings;