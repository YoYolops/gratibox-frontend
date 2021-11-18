import { Navigate } from "react-router";
import styled from "styled-components";
import backgroundImage from "../assets/landingPageImage.png";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <LandingContainer>
            <UpperSection>
                <h1 className="Title">Bem vindo ao GratiBox</h1>
                <p className="SubTitle">Receba em casa um box com chás, produtos organicos, incensos e muito mais...</p>
            </UpperSection>

            <BottomSection>
                <button className="PrimaryButton" onClick={() => { navigate("/auth/sign") }}>Quero começar</button>
                <button className="SecondaryButton" onClick={() => { navigate("/auth/log") }}>Já sou grato</button>
            </BottomSection>
        </LandingContainer>
    )
}

const LandingContainer = styled.main`
    height: 100vh;
    width: 100vw;
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 40px 20px;
`

const UpperSection = styled.section`
    width: 100%;
    color: #fff;
    text-align: center;
    max-width: 1000px;

    .Title {
        font-family: 'Roboto', sans-serif;
        font-size: 1.7rem;
        font-weight: 700;
        margin: 20px 0px 40px 0px;
        cursor: pointer;
    }

    .SubTitle {
        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        font-weight: 400;
        cursor: pointer;
    }
`

const BottomSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 1000px;

    .PrimaryButton {
        width: 200px;
        padding: 10px 20px;
        color: #fff;
        background-color: #8C97EA;
        align-self: center;
        border: none;
        border-radius: 5px;
        margin-bottom: 5px;
        font-weight: 600;
    }

    .SecondaryButton {
        width: 200px;
        padding: 10px 20px;
        color: #fff;
        background: transparent;
        align-self: center;
        border: none;
        font-weight: 600;
    }
`