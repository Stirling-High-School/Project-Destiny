export default function groupSubjects(choices) {

    let groupedSubjectsArr = [{
        label: choices[0].department,
        options: [
            { label: choices[0].subject, value: choices[0].subject }
        ]
    }]

    for (let i = 1; i < choices.length; i++) {

        let { department, subject } = choices[i]
        let currentDep = groupedSubjectsArr.find(choice => choice.label === department)

        if (currentDep) currentDep["options"].push({ label: subject, value: subject })
        else {
            groupedSubjectsArr.push({
                label: department,
                options: [
                    { label: subject, value: subject }
                ]
            })
        }
    }
    return groupedSubjectsArr;
}