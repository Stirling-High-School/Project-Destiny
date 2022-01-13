// Re-usable loading component
const Loading = ({ text, colour }) => (
    <div className="centerpls flex-grow justify-center items-center align-middle">
        <div className="justify-center items-center align-middle flex">
            <div style={{ borderTopColor: "transparent" }} className={`flex spinner w-8 h-8 border-4 border-${colour}-700 border-solid rounded-full animate-spin`} />
            <h1 className="text-2xl ml-5">{text}</h1>
        </div>
    </div>
)

export default Loading;