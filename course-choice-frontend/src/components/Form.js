import React, { useState, useReducer, useEffect } from 'react';
import { Card, MessageComponent, Loading } from './reusable';
import ActualForm from './form/ActualForm';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from '../icons/google.png';
import { toast } from "react-toastify";
import axios from 'axios';
import homeDataReducer from './reducers/homeDataReducer';
import { useLocation, Redirect } from 'react-router-dom';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQ9cLex-z8woLW1cwt-5s0mIwZ67KXWcs",
    authDomain: "shs-course-choice-auth-2021.firebaseapp.com",
    projectId: "shs-course-choice-auth-2021",
    storageBucket: "shs-course-choice-auth-2021.appspot.com",
    messagingSenderId: "810594559995",
    appId: "1:810594559995:web:8d5c63ddb167f496180d5e"
};

// Initialize Firebase
initializeApp(firebaseConfig);
function Form() {

    // Get the form ID
    const location = useLocation()
    const id = location.pathname.substring(1)

    const [profile, setProfile] = useState();

    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            'hd': 'stirlingschools.net' // Restrict to stirlingschools.net hosted domain
        });

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // Successful login
                setProfile(result.user)
                toast.success("Successfully signed in!")
            }).catch(() => {
                // Error occured
                toast.error("An error occured while trying to sign in!")
            });
    }

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
                        payload: <MessageComponent message={result.data.data[0].message} description={result.data.data[0].description} isError />
                    })
                }
            } catch (error) {
                // An unknown error occurred, generate error component
                dispatchHomeData({
                    type: 'DATA_FETCH_FAILURE',
                    payload: <MessageComponent message={"An unknown error has occured"} description={"Please try again later."} isError />
                })
            }
        }
        fetchData()
    }, [])

    let formTitle = ""

    if (courses) {
        for (let course in courses) {
            if (courses[course].course_choice_id === id) {
                formTitle = courses[course].display_name;
            }
        }
        if (!formTitle) {
            return (<Redirect to="/404" />)
        }
    }


    if (isLoading) {
        // The data is still loading, render spinner
        return <Loading text={"Loading..."} colour={"blue"} />
    } else if (isError) {
        // There has been an error, render the error component
        return errorComponent
    } else {
        // Data has loaded, display options
        return (
            profile ?
                <ActualForm profile={profile} id={id} />
                :
                <div className="centerpls w-max">
                    <Card>
                        <div className="flex flex-col justify-center items-center align-middle">
                            {/* Display the school logo from imageBlob */}
                            <img
                                style={{ width: "100px", height: "100px" }}
                                src={"data:image/png;base64," + config.image_blob}
                                alt="SHS badge"
                            />
                            <h1 className="text-2xl mb-2">{formTitle}</h1>
                            <div className="flex flex-col items-center justify-center">
                                <p className="flex justify-center mt-5 mb-1">To get started, please:</p>
                                {/* Sign in with Google button */}
                                <button onClick={googleSignIn} className="m-2 flex justify-items-start items-center bg-blue-100 rounded-full py-3 px-5">
                                    <img
                                        src={GoogleIcon}
                                        alt="google login"
                                        className="w-5 h-5 mr-5" />
                                    <p className="justify-items-center w-full mr-5 font-medium text-blue-700">Sign in with Google</p>
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
        )
    }
}

export default Form;

