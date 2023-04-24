import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadingStorageData = async () => {
            const storageUser = localStorage.getItem('@Auth:email');
            const storageToken = localStorage.getItem('@Auth:token');
            console.log(storageUser, storageToken)
    
            if(storageToken && storageUser){
                setUser(storageUser);
            }
        };

        loadingStorageData();
    }, [])

    const signIn = async (email, password) =>{
        const response = await api.post('/login', {
            email: email,
            password: password
        });
        if(!response.data.token){
            alert(response.data.msg);
        } else {
            setUser(response.data);
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.token}`;
            localStorage.setItem("@Auth:token", response.data.token);
            localStorage.setItem("@Auth:email", JSON.stringify(response.data.email));

        }
    }
    
    const signOut = () => {
        localStorage.removeItem('@Auth:token');
        localStorage.removeItem('@Auth:email');
        setUser(null);
    }
    return(
        <AuthContext.Provider value={{
            user, 
            signed: !!user,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}