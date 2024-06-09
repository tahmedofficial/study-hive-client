import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const StudentMaterialsDetails = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [materials, setMaterials] = useState([])

    useEffect(() => {
        axiosSecure.get(`material/${id}`)
            .then(res => {
                setMaterials(res.data);
            })
    }, [axiosSecure, id])

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Google Drive Link</th>
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
                                <td>
                                    <a className="btn btn-link" href={material.material}>Link</a>
                                </td>
                                <td>
                                    <a href={material.material} className="btn btn-sm bg-green-600 text-white">Download</a>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {materials.length > 0 ? undefined : <h1 className="text-center text-3xl font-medium mt-16">No data found</h1>}
        </div>
    );
};

export default StudentMaterialsDetails;