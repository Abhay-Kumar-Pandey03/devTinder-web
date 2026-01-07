import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections",
                { withCredentials: true }
            );

            dispatch(addConnection(res?.data?.data));
        } catch (err) {
            console.error("Error fetching connections:", err);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) {
        return;
    }

    if (connections.length === 0) {
        return (
            <div className="flex justify-center my-10">
                <h1 className="text-3xl font-bold ">No Connections Found</h1>
            </div>
        )
    }

    return (
        <div className="text-center my-10">
            <h1 className="text-3xl font-bold text-white">Connections</h1>

            {
                connections.map((connection) => {
                    const {
                        _id,
                        firstName,
                        lastName,
                        photoUrl,
                        age,
                        gender,
                        about,
                    } = connection;

                    return (
                        <div
                            key={_id}
                            className="max-w-2xl mx-auto bg-base-200 my-4 rounded-2xl shadow-md
                                        p-5 flex items-center justify-between gap-6
                                        transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                        >
                            {/* LEFT: PROFILE INFO */}
                            <div className="flex items-center gap-5 cursor-pointer">
                                {/* Avatar */}
                                <div className="relative">
                                    <img
                                        alt="photo"
                                        className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                                        src={photoUrl}
                                    />
                                </div>

                                {/* User Details */}
                                <div className="text-left">
                                    <h2 className="font-semibold text-lg">
                                        {firstName} {lastName}
                                    </h2>

                                    {age && gender && (
                                        <p className="text-sm text-base-content/70">
                                            {age}, {gender}
                                        </p>
                                    )}

                                    {about && (
                                        <p className="text-sm text-base-content/60 mt-1 line-clamp-2 max-w-sm">
                                            {about}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT: CHAT ACTION */}
                            <Link to={`/chat/${_id}`} state={{firstName, lastName, photoUrl}}>
                            <button
                                className="btn btn-primary btn-outline flex items-center gap-2
                                            transition-all duration-200 hover:btn-primary"
                                onClick={() => console.log("Open chat with", _id)}
                            >
                                💬 Chat
                            </button>
                            </Link>
                        </div>
                    );
                })

            }
        </div>
    )
}

export default Connections;