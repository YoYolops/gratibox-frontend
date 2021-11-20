import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import animation from "../../assets/dropDown.json";
import Lottie from "react-lottie";

export default function DropDown({ title, children }) {
    const [ isClicked, setIsClicked ] = useState(false)
    const [ animationState, setAnimationState ] = useState({
        isStopped: true, isPaused: false, direction: -1
    })

    const defaultOptions = {
        loop: false,
        autoplay: false, 
        animationData: animation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Expander
            initial="unactive"
            animate={ isClicked ? "active" : "unactive" }
            variants={variants}
        >
            <UpperSection
                onClick={() => {
                    setAnimationState(prev => ({
                        ...prev,
                        isStopped: false,
                        direction: prev.direction === 1
                            ? -1
                            : 1
                    }))
                    setIsClicked(prev => !prev)
                }}
            >
                <h1>{title}</h1>
                <div className="ArrowAnimationContainer">
                    <Lottie
                        options={defaultOptions}
                        width={"100%"}
                        height={"inherit"}
                        isStopped={animationState.isStopped}
                        isPaused={animationState.isPaused}
                        direction={animationState.direction}
                    />
                </div>
            </UpperSection>
            
            <BottomSection
                initial="unactive"
                animate={ isClicked ? "active" : "unactive" }
                variants={bottomSectionVariants}
            >{
                children
            }</BottomSection>
        </Expander>       
    )
}

const variants = {
    active: {
        height: "unset",
        transition: {
            type: "spring",
            delay: 0,
            damping: 25,
            stiffness: 200
        },
    },
    unactive: {
        height: "40px",
    }
}

const bottomSectionVariants = {
    active: {
        opacity: 1,
        transition: {
            delay: .3,
        },
    },
    unactive: {
        opacity: 0,
        transition: {
            duration: .1,
        },
    }
}

const Expander = styled(motion.div)`
    background-color: #E0D1ED;
    padding: 7px;
    border-radius: 5px;
    margin-bottom: 20px;
`

const UpperSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    .ArrowAnimationContainer {
        height: 25px;
    }

    >h1 {
        color: #4D65A8;
        font-size: 1.2rem;
        font-weight: 700;
    }
`

const BottomSection = styled(motion.div)`

`