import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const AllMaterials = () => {

    const { sweetMessage } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: materials = [], refetch } = useQuery({
        queryKey: ["adminAllMaterials"],
        queryFn: async () => {
            const res = await axiosSecure.get("/materials");
            return res.data;
        }
    })

    const handleRemove = (id) => {
        axiosSecure.delete(`/materials/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch();
                    sweetMessage("Remove Successfully");
                }
            })
    }

    return (
        <div>
            <h1 className="text-4xl font-semibold text-center my-10">All Materials</h1>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Tutor Email</th>
                            <th>Material Link</th>
                            <th>Session Id</th>
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
                                            <img src={material.image} alt="Image" />
                                        </div>
                                    </div>
                                </td>
                                <td>{material.tutorEmail}</td>
                                <td>{material.material}</td>
                                <td>{material.sessionId}</td>
                                <td>
                                    <button onClick={() => handleRemove(material._id)} className="btn btn-sm bg-red-600 text-white">Remove</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMaterials;