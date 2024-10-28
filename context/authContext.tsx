'use client'
import { createContext, ReactNode, useContext, useState } from "react";


type AuthContextProps = {
    children:ReactNode
}

type AuthContextType = {
    token:string | null
    user:string | null
    setToken:(token:string | null) => void
    setUser:(user:string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)



const AuthContextProvider = ({children}:AuthContextProps) =>{

    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<string | null>(null)


    const value = {
        token,
        user,
        setToken,
        setUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}


export default AuthContextProvider


export const useAuthContext = () =>{
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('useAuthContext must be within a provider')
    }

    return context

}