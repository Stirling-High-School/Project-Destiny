import React, { useState, useReducer, useEffect } from "react";
import { Card, MessageComponent, Loading, Logo } from "./reusable";
import ActualForm from "./form/ActualForm";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from "../icons/google.png";
import { toast } from "react-toastify";
import axios from "axios";
import homeDataReducer from "./reducers/homeDataReducer";
import { useLocation, Redirect } from "react-router-dom";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

function Form() {
    // Get the form ID
    const location = useLocation();
    const id = location.pathname.substring(1);

    const [profile, setProfile] = useState();

    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            hd: process.env.REACT_APP_GOOGLE_DOMAIN, // Restrict to specific hosted domain
        });

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                let split = result.user.email.split("@");
                if (split[1] !== process.env.REACT_APP_GOOGLE_DOMAIN) {
                    toast.error(
                        `Please use a ${process.env.REACT_APP_GOOGLE_DOMAIN} email address!`
                    );
                } else {
                    // Successful login
                    setProfile(result.user);
                    toast.success("Successfully signed in!");
                }
            })
            .catch((err) => {
                // Error occured
                toast.error("An error occured while trying to sign in!");
            });
    }

    const [homeData, dispatchHomeData] = useReducer(homeDataReducer, {
        courses: null,
        config: null,
        isLoading: true,
        isError: false,
        errorComponent: null,
    });
    const { config, courses, isError, isLoading, errorComponent } = homeData;

    // Fetch data
    useEffect(() => {
        async function fetchData() {
            // Initialise fetch data process
            dispatchHomeData({ type: "DATA_FETCH_INIT" });
            const api = process.env.REACT_APP_API_URL;
            try {
                const result = await axios.get(api);

                // If successfull, set data
                if (result.data.status_code === 200) {
                    dispatchHomeData({
                        type: "DATA_FETCH_SUCCESS",
                        payload: result.data.data,
                    });
                } else {
                    // Error occurred, generate error component
                    dispatchHomeData({
                        type: "DATA_FETCH_FAILURE",
                        payload: (
                            <MessageComponent
                                message={result.data.data[0].message}
                                description={result.data.data[0].description}
                                isError
                            />
                        ),
                    });
                }
            } catch (error) {
                // An unknown error occurred, generate error component
                dispatchHomeData({
                    type: "DATA_FETCH_FAILURE",
                    payload: (
                        <MessageComponent
                            message={"An unknown error has occured"}
                            description={"Please try again later."}
                            isError
                        />
                    ),
                });
            }
        }
        fetchData();
    }, []);

    let formTitle = "";

    if (courses) {
        for (let course in courses) {
            if (courses[course].course_choice_id === id) {
                formTitle = courses[course].display_name;
            }
        }
        if (!formTitle) {
            return <Redirect to="/404" />;
        }
    }

    if (isLoading) {
        // The data is still loading, render spinner
        return <Loading text={"Loading..."} colour={"blue"} />;
    } else if (isError) {
        // There has been an error, render the error component
        return errorComponent;
    } else {
        // Data has loaded, display options
        return profile ? (
            <ActualForm profile={profile} id={id} />
        ) : (
            <div className="centerpls w-max">
                <Card>
                    <div className="flex flex-col justify-center items-center align-middle">
                        {/* Display the school logo from imageBlob */}
                        <Logo />

                        <h1 className="text-2xl mb-2">{formTitle}</h1>
                        <div className="flex flex-col items-center justify-center">
                            <p className="flex justify-center mt-5 mb-1">
                                To get started, please:
                            </p>
                            {/* Sign in with Google button */}
                            <button
                                onClick={googleSignIn}
                                className="m-2 flex justify-items-start items-center bg-blue-100 rounded-full py-3 px-5"
                            >
                                <img
                                    src={GoogleIcon}
                                    alt="google login"
                                    className="w-5 h-5 mr-5"
                                />
                                <p className="justify-items-center w-full mr-5 font-medium text-blue-700">
                                    Sign in with Google
                                </p>
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Form;
