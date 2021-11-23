import UserSignatureCard from "./UserSignatureCard"
import { useContext, useEffect } from "react"
import UserContext from "../context/UserContext"
import { useNavigate } from "react-router";
import { PlansContainer } from "../../sharedStyles";
import LoadingPage from "../LoadingPage";
import animation from "../../assets/signaturesMeditation.json";
import LogoutFooter from "../LogoutFooter";
import { Link } from "react-router-dom";

export default function UserSignature() {
    const navigate = useNavigate()
    const { signatureData, isLoading, userData } = useContext(UserContext)

    useEffect(() => {
        if(!isLoading && !userData.token) navigate("/auth/log")
    }, [ navigate, userData, isLoading, signatureData ])

    if(isLoading || !userData.token) return <LoadingPage />

    return (
        <PlansContainer>
            <h1>{`Bom te ver por aqui, ${userData.name?.split(" ")[0]}`}</h1>
            <h2>{
                signatureData.length
                    ? "Agradecer é a arte de atrair coisas boas"
                    : "Você não possui assinaturas ainda"
            }</h2>

            {
                signatureData.map(signature => (
                    <UserSignatureCard key={signature.id} jsonAnimation={animation} signature={signature}  />
                ))
            }

            {
                signatureData.length
                    ? <LogoutFooter />
                    : <Link to="/plans">Voltar</Link>
            }
            
        </PlansContainer>
    )
}

