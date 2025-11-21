import { useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addUser, removeUser} from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("abhaypandey@gmail.in");
    const [password, setPassword] = useState("Abhay@1118");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    const handleLogin = async () => {
        try{
            const res = await axios.post (
                BASE_URL + "/login", {
                emailId,
                password,
            },
            {withCredentials: true}
            );
            dispatch(addUser(res.data));
            return navigate("/");
        }
        catch(err) {
            setError(err?.response?.data || "Login failed. Please try again.");
            console.error("Login failed:", err);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-base-300">
            <div className="card bg-base-200 w-96 shadow-xl mx-2 my-2">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-semibold mb-4 justify-center">
                        Login
                    </h2>

                    {/* FORM START */}
                    <form onSubmit={handleSubmit}>

                        {/* EMAIL FIELD */}
                        <div className="form-control mb-5">
                            <label className="label mb-1">
                                <span className="label-text">Email</span>
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                {/* Envelope icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5 opacity-70"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 5.75A2.75 2.75 0 015.75 3h12.5A2.75 2.75 0 0121 5.75v12.5A2.75 2.75 0 0118.25 21H5.75A2.75 2.75 0 013 18.25V5.75z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.5 6l8.5 7 8.5-7"
                                    />
                                </svg>

                                <input
                                    type="email"
                                    value={emailId}
                                    className="grow"
                                    placeholder="Enter your email"
                                    onChange = {(e) => setEmailId(e.target.value)}
                                />
                            </label>
                        </div>

                        {/* PASSWORD FIELD */}
                        <div className="form-control mb-5">
                            <label className="label mb-1">
                                <span className="label-text">Password</span>
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                {/* Lock icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5 opacity-70"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 10V7a4 4 0 10-8 0v3M6 10h12v7a2 2 0 01-2 2H8a2 2 0 01-2-2v-7z"
                                    />
                                </svg>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    className="grow"
                                    placeholder="Enter your password"
                                    onChange = {(e) => setPassword(e.target.value)}
                                />

                                {/* Show / Hide password */}
                                <button
                                    type="button"
                                    className="btn btn-ghost btn-xs"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        // Eye-off icon
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 opacity-70"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 3l18 18m-5.1-5.1A7.97 7.97 0 0112 19c-4.477 0-8.268-2.943-9.543-7a10.02 10.02 0 012.36-3.957m3.44-2.572A7.992 7.992 0 0112 5c4.477 0 8.268 2.943 9.543 7a9.964 9.964 0 01-1.807 3.592M9.88 9.88A3 3 0 0114.12 14.12"
                                            />
                                        </svg>
                                    ) : (
                                        // Eye icon
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 opacity-70"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.458 12C3.733 7.943 7.523 5 12 5c4.477 0 8.267 2.943 9.542 7-1.275 4.057-5.065 7-9.542 7-4.477 0-8.267-2.943-9.542-7z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </label>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <p className="text-red-500 text-sm mb-2">{error}</p>
                        <div className="form-control mt-2 flex justify-center items-center">
                            <button className="btn btn-primary px-10" type="submit" onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                    </form>

                    {/* FORM END */}
                </div>
            </div>
        </div>
    );
};

export default Login;
