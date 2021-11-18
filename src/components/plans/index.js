import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen";

export default function Plans() {
    const [ isLoading, setIsLoading ] = useState(true)

    if(isLoading) return <LoadingScreen />

    return (
        <PlansContainer>

        </PlansContainer>
    )
}

const PlansContainer = styled.div``
