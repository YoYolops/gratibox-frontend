import { useState, useContext, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Validate from "../../services/validate";
import Spinner from "../Spinner";
import Alert from "../Alert";
import Sign from "../../services/sign.js";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router";

export default function Login(props) {
    const navigate = useNavigate();
    const [ openAlert, setOpenAlert ] = useState(false);
    const [ alertMessage, setAlertMessage ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const { setUserData, storeUserDataLocally } = useContext(UserContext);
    
    const submitForm = useCallback(e => {
        if(e.key === "Enter"){
            log()
        }
    }, [ log ])

    useEffect(()=> {
        document.addEventListener("keydown", submitForm)   

        return () => document.removeEventListener('keydown', submitForm) 
    }, [ submitForm ])

    function log() {
        const validation = Validate.emptyness({
            email,
            password
        })

        if(!validation.isValid) {
            setAlertMessage("Preencha todos os zen, digo, campos")
            setOpenAlert(true)
            return;
        }

        setIsLoading(true)

        Sign.In({
            email,
            password
        })
        .then(res => {
            if(res.succeeded) {
                storeUserDataLocally(res.data);
                setUserData(res.data);
                navigate("/main");
            } else {
                setAlertMessage("Usuário inválido ou ingrato")
                setOpenAlert(true)
                setIsLoading(false)
            }
        })
    }

    return (
        <LoginContainer
            layout
            initial={{ x: 300, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 1 }}
            transition={{
                x: {
                    type: "spring",
                    stiffness: 250,
                    damping: 20
                }
            }}
        >
            <Alert isOpen={openAlert} toggle={setOpenAlert} message={alertMessage} />
            <Title>Bom te ver de novo!</Title>
            <input 
                type="email"
                placeholder="E-mail"
                onChange={ e => setEmail(e.target.value) }
                disabled={isLoading}
                value={email}
            />
            <input 
                type="password"
                placeholder="Password"
                onChange={ e => setPassword(e.target.value) }
                disabled={isLoading}
                value={password}
            />
            <button className="signer" onClick={log}>{
                isLoading
                    ? <Spinner color="#fff"/>
                    : "Entrar"
            }</button>

            <button className="toggler" onClick={props.toggle}>
                {props.btText}
            </button>
        </LoginContainer>
    )
}

const LoginContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    height: 100vh;
    overflow: hidden;
    background-color: #6D7CE4;
    position: fixed;
    width: 100%;
    top: 0;

    input {
        height: 58px;
        width: 100%;
        border-radius: 5px;
        border: none;
        outline: none;
        margin: 7px 0px;
        padding: 15px;
        font-size: 20px;
        max-width: 350px;
    }
    .signer {
        border: none;
        outline: none;
        height: 46px;
        width: 100%;
        max-width: 350px;
        font-family: 'Raleway', sans-serif;
        border-radius: 5px;
        background-color: #8C97EA;
        font-size: 17px;
        color: #fff;
        font-weight: bolder;
        margin: 20px 0px 0px 0px;
        cursor: pointer;
        max-width: 200px;
    }
    .toggler {
        color: #fff;
        font-size: 15px;
        font-weight: 700;
        margin-top: 20px;
        cursor: pointer;
        background-color: inherit;
        border: none;
        outline: none;
    }
`

const Title = styled.h1`
    color: #fff;
    font-size: 32px;
    width: 100%;
    text-align: center;
    margin-bottom: 60px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
`