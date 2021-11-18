import styled from "styled-components";
import Spinner from "./Spinner";
import LoadingAnimation from "../assets/loadingAnimation.json";
import Lottie from "react-lottie";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

console.log(LoadingAnimation)

export default function LoadingPage() {
    const [ message, setMessage ] = useState("Aguarde")
    const [ dotsQuantity, setDotsQuantity ] = useState(1)

    const messages = {
        "0": "Aguarde.",
        "1": "Aguarde..",
        "2": "Aguarde..."
    }

    useEffect(() => {
        
        const timeoutId = setTimeout(() => {
            setMessage(messages[dotsQuantity%3])
            setDotsQuantity(prev => prev + 1)
            console.log("interval")
        }, 1000)

        return () => { 
            clearTimeout(timeoutId)
        }
    })



      return (
          <LoadingPageContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
              <div className="AnimationContainer">
                <Lottie
                    options={defaultOptions}
                    width={"100%"}
                    height={"auto"}
                    isStopped={false}
                    isPaused={false}
                />
              </div>
              <div className="TextContainer">
                <p className="Dots">{message}</p>
                <p className="StaticText">Estamos alinhando os chackras</p>
              </div>
          </LoadingPageContainer>
      )
}

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const LoadingPageContainer = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .AnimationContainer {
        width: 100%;
        max-width: 1000px;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;

        >svg {
            pointer-events: none;
        }
    }

    .TextContainer {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;

        .Dots {
            font-size: 1.6rem;
            color: #fff;
            margin-bottom: 20px;
            position: fixed;
            bottom: 80px;
            left: calc(50vw - 50px)
        }

        .StaticText {
            color: #fff;
            font-size: 1.2rem;
            margin-top: 20px;
        }
    }
`