import Linkify from 'react-linkify';

export default function Header({ title, welcomeMessage, imageBlob }) {
    return (
        <div className="flex flex-col items-center mb-4">
            <img
                style={{ width: "100px", height: "100px" }}
                src={"data:image/png;base64," + imageBlob}
                alt="SHS badge"
            />
            <h1 className="text-xl sm:text-3xl md:text-4xl m-2">{title}</h1>
            <Linkify><p className="mx-8">{welcomeMessage}</p></Linkify>
        </div>
    )
}