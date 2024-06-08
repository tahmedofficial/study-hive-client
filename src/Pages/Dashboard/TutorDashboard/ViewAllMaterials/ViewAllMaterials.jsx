import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useState } from "react";
import MaterialsUpdateModal from "./MaterialsUpdateModal";

const ViewAllMaterials = () => {

    const { user, sweetMessage } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [materialId, setMaterialId] = useState("");
    const [index, setIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const { data: materials = [], refetch } = useQuery({
        queryKey: ["materials"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/materials/${user?.email}`);
            return res.data;
        }
    })

    const handleUpdate = (id, index) => {
        setMaterialId(id);
        setIndex(index);
        setShowModal(true);
    }

    const handleDelete = (id) => {
        axiosSecure.delete(`/materials/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch();
                    sweetMessage("Successfully Delete");
                }
            })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Sessoin Id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            materials.map((material, index) => <tr key={material._id} className="hover">
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={material.image} alt="image" />
                                        </div>
                                    </div>
                                </td>
                                <td>{material.title}</td>
                                <td>{material.sessionId}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleUpdate(material._id, index)} className="btn btn-sm bg-green-600 text-white">Update</button>
                                        <button onClick={() => handleDelete(material._id)} className="btn btn-sm bg-red-600 text-white">Delete</button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div>
                {
                    showModal ? <MaterialsUpdateModal refetch={refetch} id={materialId} material={materials[index]} onClose={() => setShowModal(false)}></MaterialsUpdateModal> : undefined
                }
            </div>
        </div>
    );
};

export default ViewAllMaterials;