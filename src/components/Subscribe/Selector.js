import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";


export default function Selector({ initialValue, onSelect, optionText, products, unique }) {
    const [ selected, setSelected ] = useState(initialValue)
    const [ allowUnselect, setAllowUnselect ] = useState(unique)

    useEffect(() => {
        setSelected(initialValue)
    }, [ initialValue ])

    useEffect(() => {
        function calculateHowManyProductsAreSelected() {
            let counter = 0;
            for(const key in products) {
                if(products[key].selected) counter += 1
            }
            return counter
        }
        if(!unique) {
            setAllowUnselect(calculateHowManyProductsAreSelected() > 1)
        }
    }, [ products, unique ])

    return (
        <SelectorContainer onClick={() => {
            if(unique) {
                if(!initialValue) setSelected(prev => !prev)
                onSelect()
            } else if(allowUnselect) {
                setSelected(prev => !prev)
                onSelect()

            } else {
                if(!selected) {
                    setSelected(prev => !prev)
                    onSelect()
                }
            }
            
        }}>
            <div>
                <MotionSquare
                    initial="unselected"
                    animate={ selected ? "selected" : "unselected" }
                    variants={variants}
                />
            </div>
            <OptionText selected={selected}>{optionText}</OptionText>
        </SelectorContainer>
    )
}

const variants = {
    selected: {
        scale: 1
    },
    unselected: {
        scale: 0
    }
}

const SelectorContainer = styled.div`
    width: 100%;
    background-color: inherit;
    color: #4D65A8;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    >div {
        width: 20px;
        height: 20px;
        background-color: #fff;
        margin-right: 10px;
    }
`

const MotionSquare = styled(motion.div)`
    background-color: #4D65A8;
    width: 100%;
    height: 100%;
`

const OptionText = styled.p`
    font-weight: ${props => props.selected ? 700 : 400};
`