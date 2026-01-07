import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {

    const location = useLocation();
    const targetUser = location.state;
    const socketRef = useRef(null);
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const user = useSelector((store) => store.user);
    const userId = user?._id;

    useEffect(() => {
        if (!userId) { return };
        const socket = createSocketConnection();
        socketRef.current = socket;

        //As soon as the page is loaded, the socket connection is created and joinChat is emitted;
        socket.emit("joinChat", { targetUserId });

        socket.on("messageReceived", ({ senderId, firstName, text }) => {
            console.log("Message received from ", firstName, ": ", text);
            setMessages((messages) => [...messages, { senderId, firstName, text }]);
        });

        //Very important to close the socket
        return () => {
            socket.disconnect();
        }

    }, [userId, targetUserId]);

    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        if (!socketRef.current) return;

        socketRef.current.emit("sendMessage", {
            targetUserId,
            text: newMessage,
        });
        setNewMessage("");
    };

    return (
        <div className=" flex flex-col bg-base-100">

            {/* HEADER */}
            <div className="px-6 py-4 border-b border-base-300 bg-base-200">
                <div className="flex items-center gap-3">
                    <img
                        src={targetUser?.photoUrl}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="font-semibold text-lg">
                            {targetUser
                                ? `${targetUser.firstName} ${targetUser.lastName}`
                                : "User"}
                        </h2>
                        <p className="text-sm text-success">Online</p>
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
                        {msg.senderId !== userId && (
                            <div className="chat-header">
                                {msg.firstName}
                                <time className="text-xs opacity-50">Just now</time>
                            </div>
                        )}

                        <div className="chat-bubble break-words max-w-[75%]">{msg.text}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                    </div>
                ))}
            </div>

            {/* INPUT */}
            <div className=" border-t border-base-300 bg-base-200 flex gap-2 fixed bottom-14 left-5 right-5">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="input input-bordered w-full"
                    placeholder="Type a message..."
                />
                <button
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
