const Submit = ({ message }) => (
    <div className="my-2">
        <input type="submit" value="Submit" className="cursor-pointer mb-2 px-5 py-3 bg-blue-700 rounded-xl text-gray-100 sm:w-1/3 md:w-1/6" />
        <p>{message}</p>
    </div>
)

export default Submit;