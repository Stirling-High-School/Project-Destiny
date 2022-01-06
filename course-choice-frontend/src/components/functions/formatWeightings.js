/** 
* Formats the array of available weightings to remove duplicates and handle disabled options.
* @param {Array} availableWeightings - Array of avaiable weightings objects.
* @return {Array} Array of weightings objects containing no duplicates and favouring non-disabled options.
*/
const formatWeightings = (availableWeightings) => {
    
    // Remove duplicates
    let unique = availableWeightings.filter((x, i, arr) => arr.findIndex(y => y.value === x.value && y.isDisabled === x.isDisabled) === i);
    
    // Sort (1-3 and disabled first)
    unique.sort(
        function (a, b) {
            if (a.label === b.label) {
                if (a.isDisabled && b.isDisabled) {
                    return 0
                } else if (a.isDisabled) {
                    return -1
                } else {
                    return 1
                }
            }
            return a.label > b.label ? 1 : -1;
        });

    // Remove duplicates again, but taking the last so will reflect whether that weighting is fully disabled or not
    unique = [...new Map(unique.map(weight => [weight.value, weight])).values()]
    
    return unique
}

export default formatWeightings;