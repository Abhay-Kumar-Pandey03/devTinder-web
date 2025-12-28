import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const isStrongPassword = (password) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
        return regex.test(password);
    };

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                { emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data || res?.data));
            navigate("/");
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed");
        }
    };

    const handleSignup = async () => {
        if (!firstName || !lastName || !emailId || !password) {
            setError("All fields are required");
            return;
        }

        if (!isStrongPassword(password)) {
            setError(
                "Password must contain Uppercase, Lowercase, Number & Special Character (Min 8 characters)"
            );
            return;
        }

        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data || res?.data));
            navigate("/profile");
        } catch (err) {
            setError(err?.response?.data?.message || "Signup failed");
        }
    };

    if (user) return navigate("/");

    return (
        <div className="flex min-h-screen items-center justify-center bg-base-100">
            <div className="card bg-base-200 w-96 shadow-xl mx-2 my-2">
                <div className="card-body">
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        {isLoginForm ? "Login" : "Sign Up"}
                    </h2>

                    {!isLoginForm && (
                        <>
                            <input
                                className="input input-bordered mb-3"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                className="input input-bordered mb-3"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </>
                    )}

                    {/* EMAIL */}
                    <label className="input input-bordered flex items-center gap-2 text-gray-700 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
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
                            className="grow"
                            placeholder="Email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                    </label>

                    {/* PASSWORD */}
                    <label className="input input-bordered flex items-center gap-2 text-gray-700 mb-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 10V7a4 4 0 10-8 0v3M6 10h12v7a2 2 0 01-2 2H8a2 2 0 01-2-2v-7z"
                            />
                        </svg>

                        <input
                            type={showPassword ? "text" : "password"}
                            className="grow"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            className="flex items-center justify-center p-1"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3l18 18M9.88 9.88a3 3 0 104.24 4.24"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-gray-500"
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

                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                    <div className="flex justify-center">
                        <button
                            className="btn btn-primary px-10"
                            onClick={isLoginForm ? handleLogin : handleSignup}
                        >
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>


                    {/* 🔵 FIXED BLUE LINK (PRODUCTION SAFE) */}
                    <p
                        className="text-center mt-4 cursor-pointer hover:underline !text-blue-500"
                        onClick={() => {
                            setError("");
                            setIsLoginForm(!isLoginForm);
                        }}
                    >
                        {isLoginForm
                            ? "New user? Sign Up"
                            : "Already have an account? Login"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
