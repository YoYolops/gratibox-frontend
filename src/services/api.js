import axios from "axios";

const Api = axios.create({
    baseURL: "https://54.197.71.45:433"
})

export default Api;