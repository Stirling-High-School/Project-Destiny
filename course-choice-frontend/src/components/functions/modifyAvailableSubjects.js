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