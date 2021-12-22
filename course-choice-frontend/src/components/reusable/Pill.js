const Pill = ({ action, title, children }) => (
    <div className="flex flex-col items-center justify-center">
        <p className="flex justify-center mt-5 mb-1 font-semibold">
            {title}
        </p>
        <button onClick={action} className="m-2 flex justify-items-start items-center bg-blue-100 rounded-full py-3 px-5">
            {children}
        </button>
    </div>
)

export default Pill;