import axios from "axios";

const BrasilCepApi = axios.create({
    baseURL: "https://brasilapi.com.br/api/cep/v2/"
})

async function getCepData(cep) {
    try {
        const response = await BrasilCepApi.get(cep)

        return {
            succeeded: true,
            data: response.data
        }
    } catch(e) {
        return {
            succeeded: false,
            message: e.message
        }
    }
}

export {
    getCepData
}