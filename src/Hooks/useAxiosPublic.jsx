import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://study-hive-server-tawny.vercel.app"
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;