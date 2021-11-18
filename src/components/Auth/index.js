import { useState, useLayoutEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AnimateSharedLayout } from "framer-motion";

import Login from "./Login";
import Signup from "./Signup";

export default function Auth({ hasAccount }) {
    const navigate = useNavigate();
    const [ toggleControl, setToggleControl ] = useState(hasAccount);

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