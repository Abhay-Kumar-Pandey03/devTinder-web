import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, clearRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {

    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(clearRequests(_id));
        }
        catch(err) {
            console.error("Error reviewing request:", err);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });

            dispatch(addRequests(res?.data?.data));
        }
        catch (err) {
            console.error("Error fetching requests:", err);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if(!requests) {
        return;
    }

    if (requests.length === 0) {
        return (
            <div className="flex justify-center my-10">
                <h1 className="text-3xl font-bold ">No Requests Found</h1>
            </div>
        )
    }

    return (
        <div className="text-center my-10">
            <h1 className="text-3xl font-bold text-white">Requests</h1>

            {
                requests.map((request) => {
                    const {_id, firstName, lastName, photoUrl, age, gender, about} = request.fromUserId;
                    return (
                        <div key={_id} className="flex items-center justify-between my-3 bg-base-200 rounded-2xl shadow-md p-5 w-full max-w-3xl mx-auto gap-4">
                            <div className="">
                                <img alt= "photo" className="w-20 h-20 rounded-full"src = {photoUrl}></img>
                            </div>
                            
                            <div className="mx-4 text-left">
                                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                                { age && gender && <p>{age + ", " + gender}</p> }
                                <p>{about}</p>
                            </div>

                            <div>
                                <button className="btn btn-primary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                                <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Requests