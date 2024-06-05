import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useState } from "react";
import UpdateModal from "./UpdateModal";

const ManageNotes = () => {

    const { user, sweetMessage } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState("");

    const { data: notes = [], refetch } = useQuery({
        queryKey: ["notes"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/notes/${user?.email}`);
            return res.data;
        }
    })

    const handleUpdatePage = (id) => {
        setId(id);
        setShowModal(true);
    }

    const handleDelete = (id) => {
        axiosSecure.delete(`/notes/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch();
                    sweetMessage("Deleted Successfully")
                }
            })
    }

    return (
        <div>
            <h3 className="text-center font-semibold text-4xl py-10">- - Notes - -</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    notes.map(note => <div key={note._id}>
                        <div className="bg-gray-100 px-10 py-5 h-full rounded-xl text-center mx-4 flex flex-col justify-between">
                            <h1 className="font-semibold">{note.title}</h1>
                            <div className="divider"></div>
                            <h2>{note.description}</h2>
                            <div className="flex justify-end mt-auto pt-4 gap-4">
                                <button onClick={() => handleUpdatePage(note._id)} className="btn btn-sm bg-green-600 text-white">Update</button>
                                <button onClick={() => handleDelete(note._id)} className="btn btn-sm bg-red-600 text-white">Delete</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div>
                {
                    showModal ? <UpdateModal id={id} refetch={refetch} onClose={() => setShowModal(false)}></UpdateModal> : undefined
                }
            </div>
        </div>
    );
};

export default ManageNotes;