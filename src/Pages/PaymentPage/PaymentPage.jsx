import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentPage = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [session, setSession] = useState({});
    const { image, title, tutorName, registrationFee } = session;

    useEffect(() => {
        axiosSecure.get(`/courses/${id}`)
            .then(res => {
                setSession(res.data);
            })
    }, [axiosSecure, id])

    return (
        <div className="md:w-4/6 mx-auto px-4 mt-16">
            <div className="flex gap-3">
                <div>
                    <img className="max-w-48 h-full rounded-xl" src={image} alt="image" />
                </div>
                <div>
                    <h1 className="mt-2"><span className="font-bold">Title:</span> {title}</h1>
                    <h3 className="mt-2"><span className="font-bold">Tutor Name:</span> {tutorName}</h3>
                    <h3 className="mt-2"><span className="font-bold">Price:</span> {registrationFee}</h3>
                    <button className="btn px-10 bg-primary_color text-white text-lg">Pay</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;