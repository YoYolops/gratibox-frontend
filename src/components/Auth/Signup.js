import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Spinner from "../Spinner";
import Validate from "../../services/validate";
import Alert from "../Alert";

export default function Signup(props) {
    const [ openAlert, setOpenAlert ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState(false)

    const [ name, setname ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirmation, setPasswordConfirmation ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    function register() {
        const validationResult = Validate.registerBody({
            name,
            email,
            password
        })
        if(!validationResult.isValid) {
            setOpenAlert(true)
            setAlertMessage(validationResult.message)
        }
        else alert("funfou")
    }

    return (
        <SignupContainer
            layout
            initial={{ x: -300, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 1 }}
            transition={{
                x: {
                    type: "spring",
                    stiffness: 250,
                    damping: 20
                }
            }}
        >
            <Alert isOpen={openAlert} toggle={setOpenAlert} message={alertMessage} />
            <Title>Bem vindo ao GratiBox</Title>
            <input 
                type="text"
                placeholder="Name"
                onChange={ e => setname(e.target.value) }
                value={name}
            />
            <input 
                type="email"
                placeholder="E-mail"
                onChange={ e => setEmail(e.target.value) }
                value={email}
            />
            <input 
                type="password"
                placeholder="Password"
                onChange={ e => setPassword(e.target.value) }
                value={password}
            />
            <input 
                type="password"
                placeholder="Confirm password"
                onChange={ e => setPasswordConfirmation(e.target.value) }
                value={passwordConfirmation}
            />
            <button className="signer" onClick={register} >{
                isLoading
                    ? <Spinner color="#fff"/>
                    : "Cadastrar"
            }</button>

            <button className="toggler" onClick={props.toggle}>
                {props.btText}
            </button>
        </SignupContainer>
    )
}

const SignupContainer = styled(motion.div)`
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
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    margin-bottom: 20px;
`