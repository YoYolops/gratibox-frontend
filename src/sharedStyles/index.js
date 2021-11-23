import styled from "styled-components";

export const PlansContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: #fff;
    padding: 60px 20px 20px 20px;
    width: 100%;
    max-width: 600px;
    align-self: center;
    margin: 0 auto;

    >h1 {
        font-size: 1.6rem;
        font-weight: 700;
        margin-bottom: 40px;
        width: 100%;
        text-align: left;
    }

    >h2 {
        font-size: 1rem;
        font-weight: 400;
        margin-bottom: 60px;
        width: 100%;
        text-align: left;
        line-height: 1.2rem;
    }

    a {
        font-size: 1.3rem;
        border-bottom: 2px solid #fff;
    }
`