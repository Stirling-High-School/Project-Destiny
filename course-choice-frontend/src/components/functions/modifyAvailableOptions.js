/** 
* Enables/disables wider achievement options.
* @param {String} option - The option name to be enabled/disabled.
* @param {Boolean} disabled - Whether the option is to be enabled or disabled.
* @param {Array} availableOptions - The list of the current avaiable wider achievement options (includes enabled and disabled options).
* @return {Array} Array of avaiable wider achievement options but with the desired option changed to the desired disabled state.
*/
const modifyAvailableOptions = (option, disabled, availableOptions) => {
    for (let x = 0; x < availableOptions.length; x++) {
        if (availableOptions[x].value === option) {
            if (availableOptions[x].isDisabled === !disabled) {
                availableOptions[x].isDisabled = disabled;
                break;
            }
        }
    }
    return availableOptions;
}

export default modifyAvailableOptions;