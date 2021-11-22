import { motion } from "framer-motion";
import styled from "styled-components";
import Lottie from "react-lottie";
import animation from "../../assets/addressMeditation.json";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useState, useEffect } from "react";
import { getCepData } from "../../services/brasilApi";

export default function AddressCard({ setSelectionStage }) {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ addresse, setAddresse ] = useState("")
    const [ address, setAddress ] = useState("")
    const [ cep, setCep ] = useState("")
    const [ city, setCity ] = useState("")
    const [ uf, setUf ] = useState("")

    function searchCep() {

    }

    return (
        <AddressCardContainer
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

            <div>
                <input 
                    type="text"
                    placeholder="Nome Completo"
                    onChange={ e => setAddresse(e.target.value) }
                    disabled={isLoading}
                    value={addresse}
                />
                <input 
                    type="text"
                    placeholder="CEP"
                    onChange={ e => setCep(e.target.value) }
                    disabled={isLoading}
                    value={cep}
                />
                <input 
                    type="text"
                    placeholder="Endereço de Entrega"
                    onChange={ e => setAddress(e.target.value) }
                    disabled={isLoading}
                    value={address}
                />
                <div className="CityState">
                    <input 
                        type="text"
                        placeholder="Cidade"
                        onChange={ e => setAddresse(e.target.value) }
                        disabled={isLoading}
                        value={city}
                    />
                    <select name="UF" onChange={e => setUf(e.target.value)} >
                        <option value="" disabled selected>UF</option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AM">AM</option>
                        <option value="AP">AP</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MG">MG</option>
                        <option value="MS">MS</option>
                        <option value="MT">MT</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="PR">PR</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="RS">RS</option>
                        <option value="SC">SC</option>
                        <option value="SE">SE</option>
                        <option value="SP">SP</option>
                        <option value="TO">TO</option>
                    </select>
                </div>
            </div>

            <AiOutlineArrowLeft size={30} color="#4D65A8" onClick={() => {
                setSelectionStage(0)
            }}/>
        </AddressCardContainer>
    )
}

const AddressCardContainer = styled(motion.div)`
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    padding: 0px 20px 10px 20px;
    margin-bottom: 20px;

    >div {
        >input {
            width: 100%;
            border-radius: 5px;
            margin-bottom: 10px;
            border: none;
            background-color: rgba(224, 209, 237, 0.62);
            padding: 17px;
            color: #4D65A8;
            font-size: 14px;
            ::placeholder {
                color: #4D65A8;
                font-size: 16px;
                font-weight: 600;
            }
        }

        .CityState {
            display: flex;
            justify-content: space-between;
            align-items: center;

            >input {
                width: 65%;
                border-radius: 5px;
                margin-bottom: 10px;
                border: none;
                background-color: rgba(224, 209, 237, 0.62);
                padding: 17px;
                color: #4D65A8;
                font-size: 14px;
                ::placeholder {
                    color: #4D65A8;
                    font-size: 16px;
                    font-weight: 600;
                }
            }

            >select {
                width: 30%;
                border-radius: 5px;
                margin-bottom: 10px;
                border: none;
                background-color: rgba(224, 209, 237, 0.62);
                padding: 17px;
                color: #4D65A8;
                font-size: 14px;
                font-weight: 600;
            }
        }
    }
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