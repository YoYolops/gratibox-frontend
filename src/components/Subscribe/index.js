import { PlansContainer } from "../../sharedStyles";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import LoadingPage from "../LoadingPage";
import UserContext from "../context/UserContext";
import { useParams } from "react-router-dom";
import SignCard from "./SignCard";

export default function Subscribe() {
    const navigate = useNavigate();
    const { userData, isLoading } = useContext(UserContext)
    const { type } = useParams();

    useEffect(() => {
        if(!isLoading && !userData.token) navigate("/auth/log")
    }, [ navigate, userData, isLoading ])

    if(isLoading || !userData.token) return <LoadingPage />

    return (
        <PlansContainer>
            <h1>{`Bom te ver por aqui, ${userData.name.split(" ")[0]}`}</h1>
            <h2>"Agradecer é a arte de atrair coisas boas"</h2>
            
            <SignCard type={type} />
        </PlansContainer>
    )
}