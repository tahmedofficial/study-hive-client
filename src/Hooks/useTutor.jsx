import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";

const useTutor = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isTutor, setTutor] = useState(false);
    const [isPending, setPending] = useState(true);

    useEffect(() => {
        setPending(true);
        axiosSecure.get(`/users/tutor/${user?.email}`)
            .then(res => {
                setTutor(res?.data?.tutor);
                setPending(false);
            })
    }, [axiosSecure, user])

    return [isTutor, isPending];
};

export default useTutor;