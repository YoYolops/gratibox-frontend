import styled from "styled-components";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect } from "react";


export default function Alert({ isOpen, message, toggle }) {
    let timerId;

    useEffect(() => {
        if(isOpen) {
            timerId = setTimeout(() => {
                toggle(false)
            }, 4000)
        }

        return () => { clearInterval(timerId) }
    }, [isOpen])

    function close() {
        clearTimeout(timerId)
        toggle(false)
    }

    return (
        <AlertContainer
            initial="closed"
            animate={isOpen ? "opened" : "closed"}
            variants={variants}
        >
            <AiFillCloseCircle size={20} color="#fff" onClick={close}/>
            <h1>Ops!</h1>
            <p>{message}</p>
        </AlertContainer>
    )
}

const variants = {
    opened: {
        height: "unset",
        opacity: 1,
        y: 10
    },
    closed: {
        height: 0,
        opacity: 0,
        y: -80,
    }
}

const AlertContainer = styled(motion.div)`
    width: 100%;
    max-width: 600px;
    position: fixed;
    top: 10px;
    left: 0px;
    background-color: #f74f4f;
    color: #fff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 10px 10px 10px;

    >svg {
        position: absolute;
        top: 5px;
        right: 5px;
    }

    >h1 {
        font-size: 1.4rem;
        margin-bottom: 10px;
        border-bottom: 1px solid #fff;
        font-weight: 700;
    }

    >p {
        text-align: center;
        font-weight: 500;
    }
`