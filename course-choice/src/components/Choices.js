import { useEffect, useState } from 'react';

export default function Choices() {

    const [level4, setLevel4] = useState([])
    const [level5, setLevel5] = useState([])
    const [level6, setLevel6] = useState([])
    // const [level7, setLevel7] = useState(null)
    const [additionals, setAdditionals] = useState(null)

    useEffect(() => {

        const api_endpoint = "https://script.google.com/macros/s/AKfycbyHBUEgJfD4itr-ti7-n8bf_x76_5RAuH1M-2MiVGLs58a2hL9jG_kXjSdereNUXiarWQ/exec?course_choice_id=s45"
        getData(api_endpoint);

        /**
         * Summary. Fetches data from API
         * Description. Fetches choices and assigns them to state variables
         *              for SCQF level4, level5 and level6, plus additional fields
         * 
         * @param {string} url - API endpoint
         * 
         */
        async function getData(url) {

            // Fetch data
            const response = await fetch(url);
            const data = await response.json();

            const choices = data.data.choices

            for (let i = 0; i < choices.length; i++) {
                for (let j = 0; j < choices[i].levels.length; j++) {
                    
                    // Recipe for displaying subject level + subject name
                    var display = choices[i].levels[j].level_abreviation + " " + choices[i].subject

                    // Put subject in appropriate level
                    switch (choices[i].levels[j].scqf_level) {
                        case 4:
                            setLevel4([...level4, display]);
                        case 5:
                            setLevel5([...level5, display]);
                        case 6:
                            setLevel6([...level6, display]);
                    }
                }
            }
            
            // Set additional fields
            setAdditionals(data.data.additional_fields)
        }
    }, [])

    return (
        // Test output
        <div>
            <h1>Course Options</h1>
            <h2>Level 4</h2>
            {JSON.stringify(level4)}
            <h2>Level 5</h2>
            {JSON.stringify(level5)}
            <h2>Level 6</h2>
            {JSON.stringify(level6)}
            <h1>Additionals</h1>
            {JSON.stringify(additionals)}
        </div>
    )
}
