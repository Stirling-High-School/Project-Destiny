const Button = ({ children }) => (
    <div className="cursor-pointer mt-3 px-5 py-3 bg-blue-700 rounded-xl text-gray-100 max-w-max transition duration-300 hover:bg-blue-900">
        {children}
    </div>
)

export default Button;