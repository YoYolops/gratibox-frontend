import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Signature from "../../services/signature";

const UserContext = createContext({});

export function UserProvider({ children }) {
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ isSignatureDataLoading, setIsSignatureDataLoading ] = useState(true)
    const [ isUserDataLoading, setIsUserDataLoading ] = useState(true)
    const [ userData, setUserData ] = useState({})
    const [ signatureData, setSignatureData ] = useState([])

    useEffect(() => {
        const storagedData = localStorage.getItem("gratibox");

        if(storagedData) {
            const data = JSON.parse(storagedData)
            setUserData(data)
        }
        setIsUserDataLoading(false)
    }, [])

    useEffect(() => {
        if(userData.token) {
            Signature.getUserSignature(userData.token)
            .then(res => {
                console.log(res)
                if(res.succeeded) {
                    setSignatureData(res.data)
                    setIsSignatureDataLoading(false)
                    navigate("/signatures/")
                } else {
                    setIsSignatureDataLoading(false)
                }
            })
        }
        setIsSignatureDataLoading(false)
    }, [ userData, navigate ])

    useEffect(() => {
        if(!isUserDataLoading && !isSignatureDataLoading) setIsLoading(false)
    }, [ isUserDataLoading, isSignatureDataLoading, setIsLoading ])

    function storeUserDataLocally(data) {
        localStorage.setItem("gratibox", JSON.stringify(data))
    }

    function resetApp() {
        localStorage.removeItem("gratibox")
        setUserData({})
        setSignatureData([])
        navigate("/")
    }


    return (
        <UserContext.Provider value={{
            userData,
            storeUserDataLocally,
            setUserData,
            isLoading,
            signatureData,
            resetApp
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;