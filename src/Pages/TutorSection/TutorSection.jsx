import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const TutorSection = () => {

    const axiosPublic = useAxiosPublic();

    const { data: tutors = [] } = useQuery({
        queryKey: ["tutor"],
        queryFn: async () => {
            const res = await axiosPublic.get("/tutors");
            return res.data;
        }
    })

    console.log(tutors);

    return (
        <div className="md:w-5/6 mx-auto mt-16">
            <h1 className="text-center text-4xl font-semibold py-10">- - - Our Tutors - - -</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {
                    tutors.map(tutor => <div key={tutor._id}>
                        <div className="p-5 flex flex-col items-center shadow-lg border-t rounded-xl mx-5">
                            <div>
                                <img className="h-56 rounded-full w-56" src={tutor.image} alt="" />
                            </div>
                            <div className="text-center mt-5">
                                <h3><span className="font-bold">Name: </span>{tutor.name}</h3>
                                <h3 className="my-2"><span className="font-bold">Email: </span>{tutor.email}</h3>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default TutorSection;