import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animation from "../../assets/subscribeMeditation.json";
import DropDown from "./DropDown";


export default function SignCard({ type }) {
    const [ selected, setSelectedType ] = useState(type)
    const deliveryDays = {
        weekly: [ "Seg", "Qua", "Sex" ],
        monthly: [ "Dia 1", "Dia 10", "Dia 20" ]
    }
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

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