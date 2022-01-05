import { Link } from 'react-router-dom';
import { Card, Loading, ErrorComponent } from './reusable';
import { useReducer, useEffect } from 'react';
import Header from './form/components/Header';
import homeDataReducer from './reducers/homeDataReducer';
import axios from 'axios';

function Home() {

    const [homeData, dispatchHomeData] = useReducer(
        homeDataReducer,
        {
            courses: null,
            config: null,
            isLoading: true,
            isError: false,
            errorComponent: null,
        }
    )
    const { config, courses, isError, isLoading, errorComponent } = homeData;

    // Fetch data
    useEffect(() => {
        async function fetchData() {
            // Initialise fetch data process
            dispatchHomeData({ type: 'DATA_FETCH_INIT' })
            const api = process.env.REACT_APP_API_URL;
            try {
                const result = await axios.get(api);

                // If successfull, set data
                if (result.data.status_code === 200) {
                    dispatchHomeData({
                        type: 'DATA_FETCH_SUCCESS',
                        payload: result.data.data,
                    });
                } else {
                    // Error occurred, generate error component
                    dispatchHomeData({
                        type: 'DATA_FETCH_FAILURE',
                        payload: <ErrorComponent message={result.data.data[0].message} description={result.data.data[0].description} />
                    })
                }
            } catch (error) {
                // An unknown error occurred, generate error component
                dispatchHomeData({
                    type: 'DATA_FETCH_FAILURE',
                    payload: <ErrorComponent message={"An unknown error has occured"} description={"Please try again later."} />
                })
            }
        }
        fetchData()
    }, [])

    if (isLoading) {
        // The data is still loading, render spinner
        return <Loading />
    } else if (isError) {
        // There has been an error, render the error component
        return errorComponent
    } else {
        // Data has loaded, display options
        return (
            <>
                <Header title={config.title} imageBlob={config.image_blob} />
                <div className="grid grid-cols-2 gap-10">
                    {courses.map(({ course_choice_id, display_name }, index) => (
                        <Card key={index}>
                            <h1 className="text-2xl">{display_name}</h1>
                            <Link className="hover:no-underline" to={{ pathname: `/${course_choice_id}` }}>
                                <p className="cursor-pointer mt-3 px-5 py-3 bg-blue-700 rounded-xl text-gray-100 max-w-max transition duration-300 hover:bg-blue-900">Fill out form</p>
                            </Link>
                        </Card>
                    ))}
                </div>
            </>
        )
    }
}

export default Home