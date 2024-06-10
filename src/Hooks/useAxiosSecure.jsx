import axios from "axios";

// https://study-hive-server-tawny.vercel.app
// http://localhost:5000

const axiosSecure = axios.create({
    baseURL: "https://study-hive-server-tawny.vercel.app"
})

const useAxiosSecure = () => {

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("access-token");
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;