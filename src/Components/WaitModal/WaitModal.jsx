import PropTypes from 'prop-types';


const WaitModal = ({ message }) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-white">
                <div className="bg-primary_color rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">{message}</h1>
                    {/* <h3 className="text-lg">Please wait....</h3> */}
                    <span className="loading loading-dots loading-md"></span>
                </div>
            </div>
        </div>
    );

};

export default WaitModal;

WaitModal.propTypes = {
    message: PropTypes.string
}