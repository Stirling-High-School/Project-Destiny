import { Link } from 'react-router-dom';
import { Card, Loading } from './reusable';
import { useState, useEffect } from 'react';
import Header from './form/components/Header';

function Home() {

    const [data, setData] = useState();
    const api = "https://script.google.com/macros/s/AKfycbzPHZbiSgTRSOKMzALEzfve2ggYtHIAggGZrZl7VcL3z03VlOsksyKI0Tf4roxiWj-X_Q/exec";

    useEffect(() => {
        fetch(api)
            .then(response => response.json())
            .then(data => {
                setData(data.data)
                console.log(data.data)
            })
        // TODO: add catch, deal with error course choice id invalid (redirect user to 404 page), error if form is closed.
    }, [api])

    return (
        data ?
        <>
            <Header title={data.config.title} imageBlob={data.config.image_blob} />
            <div className="grid grid-cols-2 gap-10">
                {data.courses.map(({ course_choice_id, display_name }, index) => (
                    <Card key={index}>
                        <h1 className="text-2xl">{display_name}</h1>
                        <Link to={{ pathname: `/${course_choice_id}` }}>
                            Open
                        </Link>
                    </Card>
                ))}
            </div>
        </>
        : <Loading />
    )
}

export default Home