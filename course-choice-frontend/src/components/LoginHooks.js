import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import GoogleIcon from '../icons/google.png';
import Logout from './LogoutHooks';

// refresh token - don't know what this does yet
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LoginHooks({ profile, setProfile }) {

    const onSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        setProfile(res.profileObj)
        refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('Login failed: ', res);
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
        hostedDomain: "stirlingschools.net",
    });

    if (profile) {
        return (
            <div className="flex flex-col items-center justify-center my-10">
                <p className="text-xl mb-2">Signed in!</p>
                <p className="text-3xl mb-2">Hello, {profile.name}</p>
                <p>Not right? <Logout setProfile={e => setProfile(e)} /></p>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center my-10">
                <button onClick={signIn} className="flex justify-items-start items-center cursor-pointer bg-white rounded-full p-4 w-2/3 md:w-2/5">
                    <img src={GoogleIcon} alt="google login" className="w-5 h-5"></img>
                    <p className="justify-items-center w-full mr-5 font-medium text-blue-700">Sign in with Google</p>
                </button>
            </div>
        );
    }

}

export default LoginHooks;