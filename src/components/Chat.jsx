import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const { socket, onlineUsers } = useOutletContext();
    const location = useLocation();
    const targetUser = location.state;
    const { targetUserId } = useParams();

    const user = useSelector((store) => store.user);
    const userId = user?._id;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [canChat, setCanChat] = useState(false);

    const bottomRef = useRef(null);

    /* ---------------- Fetch chat history ---------------- */
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
                    withCredentials: true,
                });

                const chatMessages = chat.data.messages.map((msg) => ({
                    senderId: msg.senderId?._id,
                    text: msg.text,
                }));

                setMessages(chatMessages);
            } catch (err) {
                console.error("Error fetching chat:", err);
            }
        };

        fetchMessages();
    }, [targetUserId]);

    /* ---------------- Socket setup ---------------- */
    useEffect(() => {
        if (!socket || !userId || !targetUserId) return;

        setCanChat(false);

        socket.emit("joinChat", { targetUserId });

        const onSuccess = () => setCanChat(true);

        socket.on("connectionSuccess", onSuccess);

        socket.on("messageReceived", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on("errorMessage", alert);

        return () => {
            socket.off("connectionSuccess", onSuccess);
            socket.off("messageReceived");
            socket.off("errorMessage");
        };
    }, [socket, userId, targetUserId]);

    /* ---------------- Auto scroll ---------------- */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /* ---------------- Send message ---------------- */
    const sendMessage = () => {
        if (!canChat || !newMessage.trim() || !socket) return;

        socket.emit("sendMessage", {
            targetUserId,
            text: newMessage,
        });

        setNewMessage("");
    };

    return (
        <div className="flex flex-col h-screen bg-base-100">

            {/* HEADER */}
            <div className="sticky top-0 z-20 px-6 py-4 bg-base-200 border-b">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img src={targetUser?.photoUrl} className="w-10 h-10 rounded-full" />
                        {onlineUsers.has(targetUserId) && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 rounded-full" />
                        )}
                    </div>
                    <div>
                        <h2 className="font-semibold">
                            {targetUser?.firstName} {targetUser?.lastName}
                        </h2>
                        <p className={`text-xs ${onlineUsers.has(targetUserId) ? "text-success" : "text-gray-400"}`}>
                            {onlineUsers.has(targetUserId) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {messages.map((msg, i) => (
                    <div key={i} className={`chat ${msg.senderId === userId ? "chat-end" : "chat-start"}`}>
                        <div className="chat-bubble max-w-[75%]">{msg.text}</div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div className="flex gap-2 p-4 border-t bg-base-200">
                <input
                    disabled={!canChat}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="input input-bordered w-full"
                    placeholder={canChat ? "Type a message..." : "Connect to start chatting"}
                />
                <button disabled={!canChat} onClick={sendMessage} className="btn btn-primary btn-square">
                    ➤
                </button>
            </div>
        </div>
    );
};

export default Chat;
