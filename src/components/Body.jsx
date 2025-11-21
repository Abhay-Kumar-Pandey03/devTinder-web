import NavBar from "./NavBar";
import Footer from "./Footer";
import {Outlet, Navigate} from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

    const Body = () => {
        const dispatch = useDispatch();
        const navigate = Navigate;
        const userData = useSelector((store) => store.user);
        const fetchUser = async() => {
            
        try{
            const user = await axios.get(BASE_URL + "/profile/view", {withCredentials: true});
            dispatch(addUser(user.data));
        }
        catch(err) {
            if(err.status === 401){
                navigate("/login");
            }
            console.error(err);
        }
        }

        useEffect(() => {
            if(!userData){
                fetchUser();
            }
        }, []);

        return (
        <>

        <NavBar />
        <Outlet />
        <Footer />

        </>
        )
    }
    
    export default Body;