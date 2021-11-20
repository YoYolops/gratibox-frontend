import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserContext = createContext({});

export function UserProvider({ children }) {
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ userData, setUserData ] = useState({})

    useEffect(() => {
        const storagedData = localStorage.getItem("gratibox");

        if(storagedData) {
            const data = JSON.parse(storagedData)
            setUserData(data)
            setIsLoading(false)
        }
        setIsLoading(false)
    }, [ navigate ])

    function storeUserDataLocally(data) {
        localStorage.setItem("gratibox", JSON.stringify(data))
    }


    return (
        <UserContext.Provider value={{
            userData,
            storeUserDataLocally,
            setUserData,
            isLoading
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;