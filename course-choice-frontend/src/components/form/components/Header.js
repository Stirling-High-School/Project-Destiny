import Linkify from 'react-linkify';
import Logo from '../../reusable/Logo';

// Form page header
export default function Header({ title, welcomeMessage, profile }) {

    // Open in new tab
    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );

    return (
        <div className="flex flex-col items-center mb-4">
            {/* Display the school logo from imageBlob */}
            <Logo />

            {/* Header with form title */}
            <h1 className="text-3xl m-2 text-center">{title}</h1>

            {/* Linkify turns links inside strings into clickable <a> tags */}
            <Linkify componentDecorator={componentDecorator}> <p className="mx-8 text-center">{welcomeMessage}</p></Linkify>

            {/* Logged in */}
            {profile &&
                <div className="flex flex-col items-center justify-center mt-6">
                    <p>Signed in as:</p>
                    {/* Display profile information */}
                    <div className="flex items-center justify-center">
                        <img
                            src={profile.photoURL}
                            alt="profile"
                            className="h-6 w-6 mr-2 rounded-full" />
                        <p className="text-xl">{profile.displayName}</p>
                    </div>
                </div>}
        </div >
    )
}