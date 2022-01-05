/** 
* Enables/disables weighting options.
* @param {Int} weight - The subject name to be enabled/disabled.
* @param {Boolean} disabled - Whether the weighting is to be enabled or disabled.
* @param {Array} availableWeightings - The list of the current avaiable weightings (includes enabled and disabled options).
* @return {Array} Array of avaiable weightings but with the desired weighting changed to the desired disabled state.
*/
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