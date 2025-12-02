
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {removeUser} from "../utils/userSlice";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = async () => {
        try{
            await axios.post(
                BASE_URL + "/logout",
                {},
                {withCredentials: true}
            );
            dispatch(removeUser());
            navigate("/login");
        }
        catch(err) {
            console.error("Logout failed:", err);
        }
    }
    return (
    <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
        💻DevTinder
        </Link>
        </div>
        {user && (
        <div className="flex gap-2">
        <div className="dropdown dropdown-end mx-5 flex items-center">
            <div className="form-control px-4">Welcome, {user.firstName}</div>
            <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            >
            <div className="w-10 rounded-full">
                <img
                alt="user photo"
                src={user.photoUrl || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_hybrid&w=740&q=80"}
                />
            </div>
            </div>
            <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-50 top-full mt-3 w-52 p-2 shadow "
            >
            <li>
                <Link to="/profile" className="justify-between">
                Profile
                </Link>
            </li>

            <li>
                <Link to="/connections">Connections</Link>
            </li>
            
            <li>
                <Link to="/requests">Requests</Link>
            </li>

            <li>
                <a onClick= {handleLogout}>Logout</a>
            </li>

            </ul>
        </div>
        </div>
        )}
        </div>
    );
};

export default NavBar;
