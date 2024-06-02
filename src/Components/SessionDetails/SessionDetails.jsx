import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SessionDetails = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [session, setSession] = useState({});
    const [isClosed, setClosed] = useState(true);
    const { image, title, description, duration, tutorName, registrationFee, registrationStartDate, registrationEndDate, classEndDate, classStartTime } = session;

    useEffect(() => {
        axiosSecure.get(`/courses/${id}`)
            .then(res => {
                setSession(res.data);
            })

        const currentDate = new Date();
        const regEndDate = new Date(registrationEndDate);
        const isClosed = currentDate <= regEndDate;
        setClosed(isClosed);

    }, [axiosSecure, id, registrationEndDate])

    return (
        <div className="px-4 pt-16 pb-10 bg-primary_bg_color">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:w-5/6 mx-auto shadow-md p-5 rounded-xl border-t">
                <div className="col-span-1">
                    <img src={image} className="rounded-xl flex-grow h-full" alt="image" />
                </div>
                <div className="col-span-2">
                    <h1 className="text-2xl font-medium"><span className="font-bold">Title:</span> {title}</h1>
                    <h3 className="mt-3"><span className="font-bold">Description:</span> {description}</h3>
                    <h3 className="mt-3"><span className="font-bold">Tutor Name:</span> {tutorName}</h3>
                    <h3 className="mt-3"><span className="font-bold">Average rating:</span> </h3>
                    <h3 className="my-3"><span className="font-bold">Reviews:</span> </h3>
                    <div className="flex flex-col md:flex-row gap-3">
                        <h3 className="btn btn-sm rounded-full bg-red-200">Registration Start: {registrationStartDate}</h3>
                        <h3 className="btn btn-sm rounded-full bg-red-200">Registration End: {registrationEndDate}</h3>
                    </div>
                    <div className="flex gap-3 my-3">
                        <h3 className="btn btn-sm rounded-full bg-red-200">Class Start: {classStartTime}</h3>
                        <h3 className="btn btn-sm rounded-full bg-red-200">Class End: {classEndDate}</h3>
                    </div>
                    <div className="flex gap-3">
                        <h3 className="btn btn-sm  rounded-full bg-red-200">Duration: {duration}</h3>
                        <h3 className="btn btn-sm  rounded-full bg-red-200">Registration Fee: {registrationFee}</h3>
                    </div>
                    {
                        isClosed ?
                            <button className="btn bg-primary_color px-10 text-white mt-5">Book now</button> :
                            <button disabled className="btn bg-primary_color px-10 text-white mt-5">Registration Closed</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default SessionDetails;