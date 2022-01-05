import Linkify from 'react-linkify';

// Form page header
const Header = ({ title, welcomeMessage, imageBlob }) => (
    <div className="flex flex-col items-center mb-4">
        {/* Display the school logo from imageBlob */}
        <img
            style={{ width: "100px", height: "100px" }}
            src={"data:image/png;base64," + imageBlob}
            alt="SHS badge"
        />

        {/* Header with form title */}
        <h1 className="text-xl sm:text-3xl md:text-4xl m-2">{title}</h1>

        {/* Linkify turns links inside strings into clickable <a> tags */}
        <Linkify><p className="mx-8">{welcomeMessage}</p></Linkify>
    </div>
)

export default Header;
