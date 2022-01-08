/** 
* Enables/disables weighting options.
* @param {Int} weight - The weighting value (index) to be enabled/disabled.
* @param {Boolean} disabled - Whether the weighting is to be enabled or disabled.
* @param {Array} availableWeightings - The list of the current avaiable weightings (includes enabled and disabled options).
* @return {Array} Array of avaiable weightings but with the desired weighting changed to the desired disabled state.
*/
const modifyAvailableWeightings = (weight, disabled, availableWeightings) => {
    console.log(availableWeightings)
    for (let x = 0; x < availableWeightings.length; x++) {
        if (availableWeightings[x].value === weight) {
            availableWeightings[x].isDisabled = disabled;
        }
    }
    console.log(availableWeightings)
    return availableWeightings;
}

export default modifyAvailableWeightings;