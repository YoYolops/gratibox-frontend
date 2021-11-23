import Api from "./api";

const Signature = {
    submit
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

export default Signature