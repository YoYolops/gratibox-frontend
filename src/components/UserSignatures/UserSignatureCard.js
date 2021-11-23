import styled from "styled-components";
import Lottie from "react-lottie";
import { motion } from "framer-motion";
import Utils from "../../utils/utils";

export default function UserSignatureCard({ jsonAnimation, signature }) {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: jsonAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    console.log(signature)

    function calculateNextDeliveries() {
        let first;
        let second;
        let third;
        const today = new Date();
        const days = [ "Monday", "Wednesday", "Friday" ]
        const monthDays = {
            "0": 1,
            "1": 10,
            "2": 20
        }

        const dayName = days[Number(signature.day)]
        const monthDay = monthDays[signature.day]

        if(signature.type === "s") {
            first = Utils.getNextDayOfTheWeek(dayName, true)
            second = Utils.getNextDayOfTheWeek(dayName, true, new Date(first))
            third = Utils.getNextDayOfTheWeek(dayName, true, new Date(second))
        } else {
            first = Utils.calculateNextDeliveryDay(today, monthDay)
            second = Utils.calculateNextDeliveryDay(first, monthDay)
            third = Utils.calculateNextDeliveryDay(second, monthDay)
        }

        const results = [
            first,
            second,
            third,
        ]

        return results.map(date => {
            const thisDate = date
            if(date.getDay() === 0) {
                const newDate = thisDate.setDate(thisDate.getDate() + 1)
                return Utils.formatDate(newDate)
            }
            if(date.getDay() === 6) {
                const newDate = thisDate.setDate(thisDate.getDate() + 2)
                return Utils.formatDate(newDate)
            }
            return Utils.formatDate(date)
        })
    }

    return (
        <PlanCardContainer whileHover={{ scale: 1.06 }}>
            <div>
                <Lottie
                    options={defaultOptions}
                    width={"100%"}
                    height={"inherit"}
                    isStopped={false}
                    isPaused={false}
                />
            </div>

            <section>
                <main>
                    <p>Plano: <span>{signature.type === "s" ? "Semanal" : "Mensal"}</span></p>
                    <p>Data da assinatura: <span>{Utils.formatDate(signature.created_at)}</span></p>
                    <p className="Title">Próximas Entregas:</p>
                    {
                        calculateNextDeliveries().map((item, index) => <p key={index} className="NextDelivery">{item}</p>)
                    }
                </main>
                <footer>{
                    signature.products.map(product => <p className="Product">{product}</p>)
                }</footer>
            </section>
        </PlanCardContainer>
    )
}

const PlanCardContainer = styled(motion.div)`
    width: 100%;
    background-color: #fff;
    margin-bottom: 15vw;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 15px;
    color: #4D65A8;
    font-weight: 600;

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

    >section {
        width: 100%;

        >main {
            width: 100%;

            >p {
                margin-bottom: 5px;

                >span {
                    color: #E63C80;
                }
            }

            .NextDelivery {
                color: #E63C80;
                margin: 5px 0px 5px 20px;
            }
        }

        >footer {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;

            .Product {
                color: #E63C80;
                margin-bottom: 0px;
                margin-top: 10px;
            }
        }
    }
`