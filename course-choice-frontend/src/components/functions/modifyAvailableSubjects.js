/** 
* Enables/disables subject choices.
* @param {String} subject - The subject name to be enabled/disabled.
* @param {Boolean} disabled - Whether the subject is to be enabled or disabled.
* @param {Array} availableSubjects - The list of the current avaiable subjects (includes enabled and disabled options).
* @return {Array} Array of avaiable subjects but with the desired subject changed to the desired disabled state.
*/
const modifyAvailableSubjects = (subject, disabled, availableSubjects) => {
    
    let department = availableSubjects.find(department => {
        for (let x = 0; x < department["options"].length; x++) {
            if (subject === department["options"][x].label) return true
        }
        return false
    });
    if (department) {
        for (let x = 0; x < department["options"].length; x++) {
            if (subject === department["options"][x].label) {
                department["options"][x].isDisabled = disabled;
            }
        }
        for (let x = 0; x < availableSubjects.length; x++) {
            if (availableSubjects[x].label === department.label) {
                availableSubjects[x] = department
            }
        }
        return availableSubjects
    }
}

export default modifyAvailableSubjects;