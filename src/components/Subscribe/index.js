import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { PlansContainer } from "../../sharedStyles";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import LoadingPage from "../LoadingPage";
import UserContext from "../context/UserContext";
import { useParams } from "react-router-dom";
import SignCard from "./SignCard";
import AddressCard from "./AddressCard";

export default function Subscribe() {
    const navigate = useNavigate();
    const { userData, isLoading } = useContext(UserContext)
    const [ selectedPlanData, setSelectedPlanData ] = useState()
    const [ selectionStage, setSelectionStage ] = useState(0)
    const [ prevData, setPrevData ] = useState({ signCard: {}, addressCard: {} })
    const { type } = useParams();

    useEffect(() => {
        if(!isLoading && !userData.token) navigate("/auth/log")
    }, [ navigate, userData, isLoading ])

    function submitSignatureRequest() {

    }

    if(isLoading || !userData.token) return <LoadingPage />

    return (
        <PlansContainer>
            <h1>{`Bom te ver por aqui, ${userData.name.split(" ")[0]}`}</h1>
            <h2>"Agradecer é a arte de atrair coisas boas"</h2>
            
            <AnimateSharedLayout>{
                selectionStage
                    ? <AnimatePresence><AddressCard key={2} setSelectionStage={setSelectionStage}/></AnimatePresence>
                    : <AnimatePresence><SignCard key={1} type={type} setSelectedPlanData={setSelectedPlanData} prevData={prevData} setPrevData={setPrevData} /></AnimatePresence>
            }</AnimateSharedLayout>

            <NextButton
                whileTap={{ scale: 0.98, backgroundColor: "#6D7CE4" }}
                onClick={() => {
                    if(selectionStage) {
                        submitSignatureRequest()
                    } else {
                        setSelectionStage(prev => prev + 1)
                    }
                }}
            >
                { selectionStage ? "Finalizar" : "Próximo" }
            </NextButton>
        </PlansContainer>
    )
}

const NextButton = styled(motion.button)`
    height: 40px;
    width: 160px;
    border: none;
    background-color: #8C97EA;
    border-radius: 5px;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    text-shadow: 1px 1px #fff;
    box-shadow: 3px 3px #7c89dd;
    align-self: center;
`