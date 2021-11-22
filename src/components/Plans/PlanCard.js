import styled from "styled-components";
import Lottie from "react-lottie";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PlanCard({ jsonAnimation, title, text, route }) {
    const navigate = useNavigate();

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: jsonAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <PlanCardContainer whileHover={{ scale: 1.06 }}>
            <Title>{title}</Title>
            <div>
                <Lottie
                    options={defaultOptions}
                    width={"100%"}
                    height={"inherit"}
                    isStopped={false}
                    isPaused={false}
                />
            </div>
            <p>{text}</p>
            <SelectPlan
                whileTap={{ scale: 0.98, backgroundColor: "#6D7CE4" }}
                onClick={e => {
                    e.preventDefault()
                    navigate(route)
                }}
            >Assinar</SelectPlan>
        </PlanCardContainer>
    )
}

const PlanCardContainer = styled(motion.div)`
    width: 100%;
    background-color: #E5CDB3;
    margin-bottom: 15vw;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 15px;
    color: #4D65A8;

    >div {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        pointer-events: none;

        >svg {
            pointer-events: none;
            z-index: -5;
        }
    }

    >p {
        font-size: 1.2rem;
        font-weight: 500;
        padding: 20px;
        line-height: 1.4rem;
    }
`

const Title = styled.h1`
    font-size: 1.6rem;
    font-weight: 700;
    text-shadow: 1px 1px #4D65A8;
`

const SelectPlan = styled(motion.button)`
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
`