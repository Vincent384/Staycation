'use client'
import { createContext, ReactNode, useContext, useState } from "react";


type AuthContextProps = {
    children:ReactNode
}

type AuthContextType = {
    token:string | null
    userId:string | null
    setToken:(token:string | null) => void
    setUserId:(id:string | null) => void
    getDataAvatar:(e:string) => void
}



const AuthContext = createContext<AuthContextType | undefined>(undefined)



const AuthContextProvider = ({children}:AuthContextProps) =>{

    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [avatar, setAvatar] = useState<HostData | null>(null)


    async function getDataAvatar(id:string){
        setUserId(id)
        try {
            const res = await fetch(`http://localhost:3000/api/host/homes?userId=${id}`
            )

            if(res.status == 404){
             return localStorage.setItem('Avatar','Ingen')
            }

            const data = await res.json()

            setAvatar({name:data.findUser.name, avatar: data.findUser.avatar})
            console.log(data)
        } catch (error) {
            
        }

    }

    const value = {
        token,
        userId,
        setToken,
        setUserId,
        getDataAvatar,
        avatar
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