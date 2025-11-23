import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

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

    if(!connections) {
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
                    const {_id, firstName, lastName, photoUrl, age, gender, about} = connection;
                    return (
                        <div key={_id} className="max-w-md mx-auto bg-base-200 my-3 rounded-2xl shadow-md p-6 flex items-center gap-6">
                            <div className="">
                                <img alt= "photo" className="w-20 h-20 rounded-full"src = {photoUrl}></img>
                            </div>
                            
                            <div className="mx-4 text-left">
                                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                                { age && gender && <p>{age + ", " + gender}</p> }
                                <p>{about}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Connections;