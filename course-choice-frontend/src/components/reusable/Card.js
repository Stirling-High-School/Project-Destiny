// Re-usable Card component
const Card = ({ children }) => (
    <div className="bg-white mt-5 p-8 md:p-10 rounded-3xl shadow-lg">
        {children}
    </div>
)

export default Card