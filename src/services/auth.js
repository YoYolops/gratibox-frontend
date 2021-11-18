import { CgFormatUnderline } from "react-icons/cg"
import Api from "./Api.js"

const Auth = {
    login,
    register
}

function createHeader(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

async function login(body) {
    try {
        const response = Api.post("/login", body)

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

async function register(body) {
    try {
        const response = Api.post("/register", body)

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