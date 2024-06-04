import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const CreateNote = () => {

    const { user, sweetMessage } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleCreateNote = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;

        const note = {
            email: user?.email,
            title,
            description
        }

        axiosSecure.post("/notes", note)
            .then(res => {
                if (res.data.insertedId) {
                    form.reset();
                    sweetMessage("Your note is saved");
                }
            })
    }

    return (
        <div>
            <div className="bg-gray-100 md:w-4/6 lg:w-3/6 p-10 rounded-lg mt-16 mx-auto">
                <h1 className="text-2xl text-center py-5">{user?.email}</h1>
                <form onSubmit={handleCreateNote} className="flex flex-col gap-3">
                    <input className="h-10 outline-none rounded-lg px-2 mx-3" type="text" name="title" placeholder="Title" required />
                    <input className="h-10 outline-none rounded-lg px-2 mx-3" type="text" name="description" placeholder="Description" required />
                    <button className="btn bg-primary_color mt-5 mx-3 text-white px-10">Save</button>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;