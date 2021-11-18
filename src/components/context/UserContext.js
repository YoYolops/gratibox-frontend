import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserContext = createContext({});

export function UserProvider({ children }) {
    const navigate = useNavigate()
    const [ userData, setUserData ] = useState({})

    useEffect(() => {
        const storagedData = localStorage.getItem("gratibox");

        if(storagedData) {
            const data = JSON.parse(storagedData)
            setUserData(data)
            navigate("/main");
        }
    }, [ navigate ])

    function storeUserDataLocally(data) {
        localStorage.setItem("mywallet", JSON.stringify(data))
    }


    return (
        <UserContext.Provider value={{
            userData,
            storeUserDataLocally,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;