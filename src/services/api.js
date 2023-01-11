import axios from "axios";

const Api = axios.create({
    baseURL: "http://54.197.71.45:80"
})

export default Api;