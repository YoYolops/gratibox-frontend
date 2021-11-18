import Api from "./api.js"

const Sign = {
    In,
    Up
}

function createHeader(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

async function In(body) {
    try {
        const response = await Api.post("/login", body)

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

async function Up(body) {
    try {
        const response = await Api.post("/register", body)

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

export default Sign;