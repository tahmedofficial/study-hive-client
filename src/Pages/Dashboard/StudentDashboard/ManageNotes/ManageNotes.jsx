import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const ManageNotes = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: notes = [] } = useQuery({
        queryKey: ["notes"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/notes/${user?.email}`);
            return res.data;
        }
    })

    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {
                notes.map(note => <div key={note._id}>
                    <div className="bg-gray-100 px-10 py-5 h-full rounded-xl text-center mx-4">
                        <h1 className="font-semibold">{note.title}</h1>
                        <div className="divider"></div>
                        <h2>{note.description}</h2>
                    </div>
                </div>)
            }
        </div>
    );
};

export default ManageNotes;