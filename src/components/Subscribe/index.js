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
import Validate from "../../services/validate";
import Alert from "../Alert";
import Spinner from "../Spinner";
import Signature from "../../services/signature";

export default function Subscribe() {
    const [ isLoadingLocally, setIsLoadingLocally ] = useState(false)
    const [ alertManagementData, setAlertManagementData ] = useState({ isActive: false, message: "" })
    const navigate = useNavigate();
    const { userData, isLoading } = useContext(UserContext)
    const [ selectionStage, setSelectionStage ] = useState(0)
    const [ prevData, setPrevData ] = useState({ signCard: {}, addressCard: {} })
    const { type } = useParams();

    useEffect(() => {
        if(!isLoading && !userData.token) navigate("/auth/log")
    }, [ navigate, userData, isLoading ])

    function submitSignatureRequest() {
        setIsLoadingLocally(true)
        const mapableProducts = Object.keys(prevData.signCard.products)

        const body = {
            userId: userData.id,
            addressee: prevData.addressCard.addressee,
            planId: prevData.signCard.planType === "weekly" ? 1 : 0,
            cep: prevData.addressCard.cep,
            day: prevData.signCard.deliveryDay,
            complement: prevData.addressCard.complement,
            productId: mapableProducts.map(key => {
                if(prevData.signCard.products[key].selected) return prevData.signCard.products[key].productId
                return null;
            }).filter(Boolean),
        }

        const validationBody = { ...body }
        delete validationBody.complement
        const emptinessValidation = Validate.emptyness(validationBody)
        if(!emptinessValidation.isValid) {
            setAlertManagementData({
                isActive: true,
                message: "Preencha todos os campos obrigatórios"
            })
            setIsLoadingLocally(false)
            return;
        }
        if(body.cep.length !== 8) {
            setAlertManagementData({
                isActive: true,
                message: "Esse CEP não existe"
            })
            setIsLoadingLocally(false)
            return;
        }

        Signature.submit(userData.token, body)
            .then(res => {
                if(!res.succeeded) {
                    setAlertManagementData({
                        isActive: true,
                        message: res.message
                    })
                    setIsLoadingLocally(false)
                } else {
                    navigate("/")
                }
            })
    }

    if(isLoading || !userData.token) return <LoadingPage />

    return (
        <PlansContainer>
            <h1>{`Bom te ver por aqui, ${userData.name.split(" ")[0]}`}</h1>
            <h2>"Agradecer é a arte de atrair coisas boas"</h2>
            
            <AnimateSharedLayout>{
                selectionStage
                    ? <AnimatePresence><AddressCard key={2} setSelectionStage={setSelectionStage} prevData={prevData} setPrevData={setPrevData} forceLoading={isLoadingLocally} /></AnimatePresence>
                    : <AnimatePresence><SignCard key={1} type={type} prevData={prevData} setPrevData={setPrevData} /></AnimatePresence>
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
            >{
                isLoadingLocally
                    ? <Spinner color="#fff" size={20} />
                    : selectionStage ? "Finalizar" : "Próximo"
            }</NextButton>
            <Alert 
                isOpen={alertManagementData.isActive}
                message={alertManagementData.message}
                toggle={(boolean) => setAlertManagementData(prev => ({
                    ...prev,
                    isActive: boolean }))} />
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