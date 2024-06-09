import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";

const useAdmin = () => {

    const { user, isLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isAdmin, setAdmin] = useState(false);
    const [isPending, setPending] = useState(true);

    useEffect(() => {
        setPending(true);
        if (!isLoading) {
            axiosSecure.get(`/users/admin/${user?.email}`)
                .then(res => {
                    setAdmin(res?.data?.admin);
                    setPending(false);
                })
        }
    }, [axiosSecure, user, isLoading])

    return [isAdmin, isPending];
};

export default useAdmin;