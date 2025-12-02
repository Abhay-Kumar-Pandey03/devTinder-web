import { useDispatch } from "react-redux";
import axios from "axios";
import { removeFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {

    const { _id, photoUrl, firstName, lastName, about, age, gender } = user;
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );

            dispatch(removeFeed(userId));

        }
        catch (err) {
            console.error("Error sending request:", err);
        }
    }



    return (
        <div className='flex justify-center mt-10'>
            <div className="card bg-base-300 w-full max-w-md rounded-2xl shadow-xl p-4 flex flex-col items-center text-center ">
                <figure>
                    <img
                        src={photoUrl}
                        alt="user"
                        className="w-full h-64 object-cover rounded-xl"
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300";
                        }}
                    />

                </figure>
                <div className="card-body">
                    <h2 className="card-title text-xl justify-center ">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                    <div className="flex gap-6 mt-6 w-full justify-center">
                        <button className="btn btn-outline btn-info w-28">
                            Interested
                        </button>
                        <button className="btn btn-outline btn-error w-28">
                            Ignored
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserCard;