/** 
* Groups subjects by department.
* @param {Array} choices - Array of availabel subject objects.
* @return {Array} Array of subjects grouped by department.
*/
export default function groupSubjects(choices) {

    // Initialise groupedSubjectsArr with first subject
    let groupedSubjectsArr = [{
        label: choices[0].department,
        options: [
            { label: choices[0].subject, value: choices[0].subject, isDisabled: false }
        ]
    }]

    // Loop for all other choices
    for (let i = 1; i < choices.length; i++) {

        let { department, subject } = choices[i]

        // Look for the department in the grouped array
        let currentDep = groupedSubjectsArr.find(choice => choice.label === department)

        // If the subject exists, push the subject to the array with key matching the department name
        // Otherwise create a new entry for the department and add the subject to it
        if (currentDep) {
            currentDep["options"].push({ label: subject, value: subject, isDisabled: false })
        } else {
            groupedSubjectsArr.push({
                label: department,
                options: [
                    { label: subject, value: subject, isDisabled: false }
                ]
            })
        }
    }

    return groupedSubjectsArr;
}