import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animation from "../../assets/subscribeMeditation.json";
import DropDown from "./DropDown";
import Selector from "./Selector";


export default function SignCard({ type }) {
    const [ planType, setPlanType ] = useState(type)
    const [ deliveryDay, setDeliveryDay ] = useState(0)
    const [ products, setProducts ] = useState({
        incense: { productId: 1, selected: true },
        tea: { productId: 2, selected: false },
        organicProducts: { productId:3, selected: false }

    })

    return (
        <SignCardContainer>
            <UpperSection>
                <Lottie
                    options={defaultOptions}
                    width={"100%"}
                    height={"inherit"}
                    isStopped={false}
                    isPaused={false}
                />
            </UpperSection>

            <DropDown title="Plano">
                <Selector initialValue={planType === "weekly"} optionText="Semanal" onSelect={() => { setPlanType("weekly") }}  unique={true}/>
                <Selector initialValue={planType === "monthly"} optionText="Mensal"  onSelect={() => { setPlanType("monthly") }} unique={true} />
            </DropDown>

            <DropDown title="Entrega">
                <Selector initialValue={deliveryDay === 0} optionText={planType === "weekly" ? "Segunda-feira" : "Dia 01"} onSelect={() => { setDeliveryDay(0) }} unique={true} />
                <Selector initialValue={deliveryDay === 1} optionText={planType === "weekly" ? "Quarta-feira" : "Dia 10"}  onSelect={() => { setDeliveryDay(1) }} unique={true} />
                <Selector initialValue={deliveryDay === 2} optionText={planType === "weekly" ? "Sexta-feira" : "Dia 20"}  onSelect={() => { setDeliveryDay(2) }} unique={true} />
            </DropDown>

            <DropDown title="Quero Receber">
                <Selector initialValue={products.incense.selected} optionText="Incensos" onSelect={() => { setProducts(prev => ({ ...prev, incense: { productId: 1, selected: !prev.incense.selected } })) }} unique={false}  products={products}/>
                <Selector initialValue={products.tea.selected} optionText="Chás"  onSelect={() => { setProducts(prev => ({ ...prev, tea: { productId: 2, selected: !prev.tea.selected } })) }} unique={false} products={products}/>
                <Selector initialValue={products.organicProducts.selected} optionText="Produtos Orgânicos"  onSelect={() => { setProducts(prev => ({ ...prev, organicProducts: { productId: 1, selected: !prev.organicProducts.selected } })) }} unique={false} products={products}/>
            </DropDown>
        </SignCardContainer>
    )
}

const SignCardContainer = styled.div`
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    padding: 0px 20px 10px 20px;
`

const UpperSection = styled.div`
    width: 100%;
    pointer-events: none;

    >svg {
        pointer-events: none;
    }
`
const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const deliveryDays = {
    weekly: [ "Seg", "Qua", "Sex" ],
    monthly: [ "Dia 1", "Dia 10", "Dia 20" ]
}