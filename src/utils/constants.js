export const BASE_URL =
    location.hostname === "localhost"
        ? "http://localhost:3000/api"
        : "/api";

export const SOCKET_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : window.location.origin;
