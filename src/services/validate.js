const Validate = {
    registerBody,
    emptyness
}

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function registerBody(body) {
    if(!emptyness(body).isValid) return {
        isValid: false,
        message: "Auummmm... preencha todos os campos"
    }

    if(body.name.length < 2) return {
        isValid: false,
        message: "Uma andorinha não faz o verão, uma letra não faz um nome"
    }
    if(!body.email.test(emailRegex)) return {
        isValid: false,
        message: "Insira um e-mail zen"
    }
    if(body.password.length <= 6) return {
        isValid: false,
        message: "Sua senha precisa ter ao menos 6 caracteres good vibes"
    }
    return {
        isValid: true
    }
}

function emptyness(body) {
    for(const key in body) {
        if(!body[key] || `${body[key]}`.trim() === "") return {
            isValid: false,
            message: "Preencha todos os campos"
        }
    }
    return {
        isValid: true
    }
}

export default Validate;