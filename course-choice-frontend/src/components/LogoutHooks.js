import React from 'react';
import { useGoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LogoutHooks({ setProfile }) {
    const onLogoutSuccess = (res) => {
        console.log('Logged out Success');
        setProfile(null)
        // alert('Logged out Successfully ✌');
    };

    const onFailure = () => {
        console.log('Handle failure cases');
    };

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
    });

    return (
        <button onClick={signOut} className="hover:underline text-blue-800">Log out</button>
    );
}

export default LogoutHooks;