import styled from "styled-components";
import UserContext from "./context/UserContext";
import { useContext } from "react";

export default function LogoutFooter() {
    const { resetApp } = useContext(UserContext)

    return (
        <FooterContainer
            onClick={resetApp}
        >
        Sair
    </FooterContainer>
    )
}

const FooterContainer = styled.button`
    background-color: #E63C80;
    bottom: 0;
    left: 0;
    width: 120px;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    text-align: center;
`