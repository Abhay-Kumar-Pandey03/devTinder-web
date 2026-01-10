import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation, useOutletContext } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
// import { useOutletContext } from "react-router-dom";

const Chat = () => {
    
    const { socket, onlineUsers } = useOutletContext();
    const location = useLocation();
    const targetUser = location.state;
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const user = useSelector((store) => store.user);
    const userId = user?._id;
    const [canChat, setCanChat] = useState(false);
    const bottomRef = useRef(null);

    // const socketRef = useRef(null);
    // const [onlineUsers, setOnlineUsers] = useState(new Set());

    // useEffect(() => {
    //     const checkConnection = async () => {
    //         const res = await axios.get(
    //             BASE_URL + "/connection/status/" + targetUserId,
    //             { withCredentials: true }
    //         );
    //         setCanChat(res.data.connected);
    //     };

    //     checkConnection();
    // }, [targetUserId]);

    const fetchMessages = async () => {

        try {
            const chat = await axios.get(BASE_URL + "/chat" + `/${targetUserId}`,
                { withCredentials: true }
            );

            const chatMessages = chat?.data?.messages.map((msg) => {
                const { senderId, text } = msg;
                return {
                    senderId: senderId?._id,
                    firstName: senderId?.firstName,
                    lastName: senderId?.lastName,
                    text: text
                };
            });

            console.log(chat?.data?.messages);
            setMessages(chatMessages);
        }
        catch (err) {
            console.error("Error fetching chat history:", err);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        if (!userId || !targetUserId) { return };

        // const socket = createSocketConnection();
        // const socket = socketRef.current;
        if (!socket) return;

        //As soon as the page is loaded, the socket connection is created and joinChat is emitted;
        console.log("Before", canChat);
        socket.emit("joinChat", { targetUserId });
        // setCanChat(true);
        console.log("After", canChat);

        const handleConnectionSuccess = () => {
            setCanChat(true);
        }

        // const handleConnectionError = () => {
        //     setCanChat(false);
        //     alert("You cannot chat with this user. Please connect first.");
        // }

        socket.on("connectionSuccess", handleConnectionSuccess);
        // socket.on("connectionError", handleConnectionError);

        socket.on("messageReceived", ({ senderId, firstName, lastName, text }) => {
            console.log("Message received from ", firstName, ": ", text);
            setMessages((messages) => [...messages, { senderId, firstName, lastName, text }]);
        });

        socket.on("errorMessage", (message) => {
            alert(message); // or toast
        });

        // socket.emit("getOnlineUsers");
        // socket.on("onlineUsers", (users) => {
        //     setOnlineUsers(new Set(users));
        // });


        // socket.on("userOnline", (userId) => {
        //     console.log("User online:", userId);
        //     setOnlineUsers((prev) => new Set(prev).add(userId));
        // });

        // socket.on("userOffline", (userId) => {
        //     console.log("User offline:", userId);
        //     setOnlineUsers((prev) => {
        //         const updated = new Set(prev);
        //         updated.delete(userId);
        //         return updated;
        //     });
        // });

        //Very important to close the socket
        return () => {
            socket.off("connectionSuccess");
            socket.off("messageReceived");
            socket.off("errorMessage");
            // socket.disconnect();
        }

    }, [userId, targetUserId, socket]);

    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (!canChat) return;
        if (!newMessage.trim()) return;
        if (!socket) return;

        socket.emit("sendMessage", {
            targetUserId,
            text: newMessage,
        });
        setNewMessage("");
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className=" flex flex-col h-screen bg-base-100">

            {/* HEADER */}
            <div className="sticky top-0 z-20 px-6 py-4 border-b border-base-300 bg-base-200">

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={targetUser?.photoUrl}
                            className="w-10 h-10 rounded-full"
                        />
                        {onlineUsers.has(targetUserId) && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-base-200 rounded-full"></span>
                        )}
                    </div>

                    <div className="flex flex-col leading-tight">
                        <h2 className="font-semibold text-lg">
                            {targetUser
                                ? `${targetUser.firstName} ${targetUser.lastName}`
                                : "User"}
                        </h2>
                        {
                            <p
                                className={`text-xs ${onlineUsers.has(targetUserId)
                                    ? "text-success"
                                    : "text-gray-400"
                                    }`}
                            >
                                {onlineUsers.has(targetUserId) ? "Online" : "Offline"}
                            </p>
                        }

                    </div>
                </div>

            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat ${msg.senderId === userId ? "chat-end" : "chat-start"
                            }`}
                    >
                        {/* {msg.senderId !== userId && (
                            <div className="chat-header">
                                {msg.firstName}
                                <time className="text-xs opacity-50">Just now</time>
                            </div>
                        )} */}

                        <div className="chat-bubble break-words max-w-[75%]">{msg.text}</div>
                        {/* <div className="chat-footer opacity-50">Seen</div> */}

                        <div ref={bottomRef} />
                    </div>
                ))}
            </div>

            {/* INPUT */}
            <div className=" border-t border-base-300 bg-base-200 flex gap-2 p-4">
                <input
                    disabled={!canChat}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="input input-bordered w-full"
                    placeholder={
                        canChat ? "Type a message..." : "Connect to start chatting"
                    }
                />
                <button
                    disabled={!canChat}
                    onClick={sendMessage}
                    className="btn btn-primary btn-square"
                    aria-label="Send message"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                        />
                    </svg>
                </button>

            </div>
        </div>
    );
};

export default Chat;
