import axios from "axios";

const Api = axios.create({
    baseURL: "https://gratiboxf.herokuapp.com"
})

export default Api;