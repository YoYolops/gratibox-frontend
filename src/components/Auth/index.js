import { useContext, useEffect, useState } from "react";
import { AnimateSharedLayout } from "framer-motion";
import { useNavigate } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import UserContext from "../context/UserContext";

export default function Auth({ hasAccount }) {
    const navigate = useNavigate()
    const [ toggleControl, setToggleControl ] = useState(hasAccount);
    const { userData, isLoading } = useContext(UserContext)

    useEffect(() => {
        if(!isLoading && userData.token) navigate("/plans")
    }, [ userData, isLoading ])

    function toggleHandler() {
        setToggleControl(prevState => !prevState)
    }

    return (
        <AnimateSharedLayout>{
            toggleControl
                ? <Login btText="Ainda não sou grato" toggle={toggleHandler} />
                : <Signup btText="Já sou grato" toggle={toggleHandler} />
        }</AnimateSharedLayout>
    )
}