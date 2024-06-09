import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";

const useTutor = () => {

    const { user, isLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isTutor, setTutor] = useState(false);
    const [isPending, setPending] = useState(true);

    useEffect(() => {
        setPending(true);
        if (!isLoading) {
            axiosSecure.get(`/users/tutor/${user?.email}`)
                .then(res => {
                    setTutor(res?.data?.tutor);
                    setPending(false);
                })
        }
    }, [axiosSecure, user, isLoading])

    return [isTutor, isPending];
};

export default useTutor;