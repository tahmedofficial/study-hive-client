import PropTypes from "prop-types";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAuth from "../../../../Hooks/useAuth";

const ReviewModal = ({ onClose, booking }) => {

    const { user, sweetMessage } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [reting, setReting] = useState(0);

    const handleReview = (event) => {
        event.preventDefault();
        const review = event.target.review.value;
        console.log(reting, review);

        const userReview = {
            sessionId: booking?.sessionId,
            reviewEmail: user?.email,
            reting: reting,
            review: review
        }

        axiosPublic.post("/review", userReview)
            .then(res => {
                if (res.data?.insertedId) {
                    onClose()
                    console.log(res.data);
                    sweetMessage("Thank you for the review")
                }
            })

    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-2 text-gray-600">
                <button onClick={onClose} className="place-self-end text-2xl text-white p-1 rounded-lg hover:bg-primary_color duration-300"><MdClose /></button>
                <div className="bg-white rounded-xl px-16 py-8 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Review</h1>
                    <form onSubmit={handleReview}>
                        <div className="flex justify-center mb-4">
                            <ReactStars
                                count={5}
                                onChange={setReting}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                        <div>
                            <textarea className="bg-primary_bg_color outline-none p-2 rounded-lg lg:min-w-96 h-28" placeholder="Review" name="review" required></textarea>
                        </div>
                        <button className="btn bg-primary_color text-white px-10 flex mt-8 mx-auto">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;

ReviewModal.propTypes = {
    onClose: PropTypes.func,
    booking: PropTypes.object
}