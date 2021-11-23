import Api from "./api";

const Signature = {
    submit,
    getUserSignature
}

function createHeader(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

async function submit(token, body) {
    try {
        const response = await Api.post("/signature", body, createHeader(token))
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

async function getUserSignature(token) {
    try {
        const response = await Api.get("/signature", createHeader(token))
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

export default Signature