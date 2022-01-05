import Button from '../../reusable/Button';

// Submit button + message
const Submit = ({ message }) => (
    <div className="my-8">
        <Button>
            <button type="submit" value="Submit">Submit</button>
        </Button>
        <p className="mt-2">{message}</p>
    </div>
)

export default Submit;