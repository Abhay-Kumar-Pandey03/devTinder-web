import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/appStore";

import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";

// 🔹 IMPORT NEW PAGES
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

function AppRoutes() {
  const user = useSelector((store) => store.user);

  return (
    <Routes>
      <Route path="/" element={<Body />}>

        {/* 🔁 Redirect ONLY for root path */}
        <Route
          index
          element={
            user
              ? <Navigate to="/feed" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* 🔐 Auth / App Routes */}
        <Route path="login" element={<Login />} />
        <Route path="feed" element={<Feed />} />
        <Route path="profile" element={<Profile />} />
        <Route path="connections" element={<Connections />} />
        <Route path="requests" element={<Requests />} />
        <Route path="premium" element={<Premium />} />
        <Route path="chat/:targetUserId" element={<Chat />} />

        {/* 🌍 PUBLIC LEGAL & INFO ROUTES (NO AUTH REQUIRED) */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<Terms />} />

      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}
