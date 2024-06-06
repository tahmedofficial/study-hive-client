import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import UpdateRoleModal from "./UpdateRoleModal";

const ViewAllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState("");
    const [search, setSearch] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [isRefetch, setRefetch] = useState(true);

    useEffect(() => {
        axiosSecure.get(`/users?search=${search}`)
            .then(res => {
                setAllUsers(res.data);
            })
    }, [axiosSecure, search, isRefetch])

    const handleRole = (id) => {
        setUserId(id);
        setShowModal(true);
    }

    return (
        <div>
            <div>
                <input onChange={(e) => setSearch(e.target.value)} className="h-12 lg:flex mx-auto my-16 rounded-lg outline-none px-3 bg-primary_bg_color md:w-96" type="text" placeholder="Search by name or email" />
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            allUsers.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user.image} alt="Img" />
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><button onClick={() => handleRole(user._id)} className="btn btn-sm bg-primary_color text-white">Update Role</button></td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
            <div>
                {
                    showModal ? <UpdateRoleModal id={userId} refetch={() => setRefetch(!isRefetch)} onClose={() => setShowModal(false)}></UpdateRoleModal> : undefined
                }
            </div>
        </div>
    );
};

export default ViewAllUsers;