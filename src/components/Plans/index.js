import weeklyMeditation from "../../assets/weeklyMeditation.json";
import monthlyMeditation from "../../assets/monthlyMeditation.json";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router";
import PlanCard from "./PlanCard";
import { PlansContainer } from "../../sharedStyles";
import LoadingPage from "../LoadingPage";

export default function Plans() {
    const navigate = useNavigate()
    const { userData, isLoading, signatureData } = useContext(UserContext)
    const weeklyText = "Você recebe um box por semana, ideal para quem quer exercer a gratidão todos os dias"
    const monthlyText = "Você recebe um box por mês, ideal para quem está começando agora"

    useEffect(() => {
        if(!isLoading && !userData.token) navigate("/auth/log")
        else if(!isLoading && signatureData.length) navigate("/signatures/")
        
    }, [ navigate, userData, isLoading, signatureData ])

    if(isLoading || !userData.token) return <LoadingPage />

    return (
        <PlansContainer>
            <h1>{`Bom te ver por aqui, ${userData.name?.split(" ")[0]}`}</h1>
            <h2>Você ainda não assinou um plano, que tal começar agora?</h2>

            <PlanCard jsonAnimation={weeklyMeditation} title="Plano Semanal" text={weeklyText} route="/subscribe/weekly"/>
            <PlanCard jsonAnimation={monthlyMeditation} title="Plano Mensal" text={monthlyText} route="/subscribe/monthly" />
        </PlansContainer>
    )
}
