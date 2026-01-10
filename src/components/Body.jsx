import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // ✅ correct hook
    const user = useSelector((store) => store.user);
    const location = useLocation();
    const socketRef = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState(new Set());

    useEffect(() => {

        if(!user) return;

        // Establish socket connection
        const socket = createSocketConnection();
        socketRef.current = socket;

        socket.emit("getOnlineUsers");

        socket.on("onlineUsers", (users) => {
            setOnlineUsers(new Set(users));
        });

        socket.on("userOnline", (userId) => {
            setOnlineUsers((prev) => new Set(prev).add(userId));
        });

        socket.on("userOffline", (userId) => {
            setOnlineUsers((prev) => {
                const updated = new Set(prev);
                updated.delete(userId);
                return updated;
            });
        });

        // Clean up on unmount
        return () => {
            socket.off("onlineUsers");
            socket.off("userOnline");
            socket.off("userOffline");
            socket.disconnect();
            socketRef.current = null;
        };
    }, [user]);


    // Hide footer on chat pages
    const hideFooter = location.pathname.startsWith("/chat");

    const fetchUser = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/profile/view",
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
        } catch (err) {
            // ✅ correct axios error handling
            if (err.response?.status === 401) {
                navigate("/login");
            }
            console.error(err);
        }
    };

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [user]); // ✅ dependency added

    return (
        <>
            <NavBar />
            <Outlet context={{ socket: socketRef.current, onlineUsers }} />
            {!hideFooter && <Footer />}
        </>
    );
};

export default Body;
