export default function Header({ title, welcomeMessage, imageBlob }) {
    return (
        <div className="flex flex-col items-center">
            {/* <img 
                style={{ width: "125px", height:"125px" }}
                src={URL.createObjectURL(imageBlob)}
                alt="SHS badge"
            /> */}
            <h1 className="text-xl sm:text-3xl md:text-4xl m-4">{title}</h1>
            <p className="mx-8">{welcomeMessage}</p>
        </div>
    )
}