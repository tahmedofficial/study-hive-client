import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripePaymentKey);

const PaymentModal = ({ onClose, session }) => {

    const { registrationFee } = session;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-2 text-gray-600">
                <button onClick={onClose} className="place-self-end text-2xl text-white p-1 rounded-lg hover:bg-primary_color duration-300"><MdClose /></button>
                <div className="bg-white rounded-xl px-16 py-8 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Pay ${registrationFee}</h1>
                    <div className="min-w-64">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm session={session} onClose={onClose}></CheckoutForm>
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;

PaymentModal.propTypes = {
    onClose: PropTypes.func,
    session: PropTypes.object
}