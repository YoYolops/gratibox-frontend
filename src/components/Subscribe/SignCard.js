import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animation from "../../assets/subscribeMeditation.json";
import DropDown from "./DropDown";
import Selector from "./Selector";


export default function SignCard({ type, setSelectedPlanData, setPrevData, prevData }) {
    const [ planType, setPlanType ] = useState(prevData.signCard.planType || type)
    const [ deliveryDay, setDeliveryDay ] = useState(prevData.signCard.deliveryDay || 0)
    const [ products, setProducts ] = useState(prevData.signCard.products || {
        incense: { productId: 1, selected: true },
        tea: { productId: 2, selected: false },
        organicProducts: { productId:3, selected: false }
    })

    useEffect(() => {
        const mapableProducts = Object.keys(products)

        const selectedPlanData = {
            planId: planType === "weekly" ? 1 : 0,
            day: deliveryDay,
            productId: mapableProducts.map(key => {
                if(products[key].selected) return products[key].productId
                return null;
            }).filter(Boolean)
        }
        setSelectedPlanData(selectedPlanData)

        return () => { setPrevData(prev => ({
            ...prev,
            signCard: {
                planType,
                deliveryDay,
                products
            }
        }))}

    }, [ planType, deliveryDay, products, setPrevData, setSelectedPlanData ])

    return (
        <SignCardContainer
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .12, delay: .12 } }}
            exit={{ opacity: 0, transition: { duration: .18 } }}
        >
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
                <Selector 
                    initialValue={planType === "weekly"}
                    optionText="Semanal"
                    onSelect={() => { setPlanType("weekly") }} 
                    unique={true}/>
                <Selector 
                    initialValue={planType === "monthly"}
                    optionText="Mensal"
                    onSelect={() => { setPlanType("monthly") }} 
                    unique={true} />
            </DropDown>

            <DropDown title="Entrega">
                <Selector
                    initialValue={deliveryDay === 0}
                    optionText={planType === "weekly" ? "Segunda-feira" : "Dia 01"} 
                    onSelect={() => { setDeliveryDay(0) }} 
                    unique={true} />
                <Selector
                    initialValue={deliveryDay === 1}
                    optionText={planType === "weekly" ? "Quarta-feira" : "Dia 10"} 
                    onSelect={() => { setDeliveryDay(1) }}
                    unique={true} />
                <Selector
                    initialValue={deliveryDay === 2}
                    optionText={planType === "weekly" ? "Sexta-feira" : "Dia 20"} 
                    onSelect={() => { setDeliveryDay(2) }}
                    unique={true} />
            </DropDown>

            <DropDown title="Quero Receber">
                <Selector
                    initialValue={products.incense.selected}
                    optionText="Incensos" 
                    onSelect={() => { setProducts(prev => ({ ...prev, incense: { productId: 1, selected: !prev.incense.selected } })) }} 
                    unique={false}
                    products={products}/>
                <Selector
                    initialValue={products.tea.selected}
                    optionText="Chás" 
                    onSelect={() => { setProducts(prev => ({ ...prev, tea: { productId: 2, selected: !prev.tea.selected } })) }} 
                    unique={false}
                    products={products}/>
                <Selector
                    initialValue={products.organicProducts.selected}
                    optionText="Produtos Orgânicos"
                    onSelect={() => { setProducts(prev => ({ ...prev, organicProducts: { productId: 3, selected: !prev.organicProducts.selected } })) }} 
                    unique={false}
                    products={products}/>
            </DropDown>
        </SignCardContainer>
    )
}

const SignCardContainer = styled(motion.div)`
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    padding: 0px 20px 10px 20px;
    margin-bottom: 20px;
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
