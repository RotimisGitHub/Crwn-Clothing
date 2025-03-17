import {createContext, useEffect, useState} from "react";
import {onAuthStateChangedListener, createUserDocument, } from '../utils/firebase/firebase.utils'

export const AuthIntelContext = createContext(null)

const UserProvider = ({children}) => {


    const [authData, setAuthData] = useState(null)

    // This Event Handler Retrieves User Data from Firebase and sets it into the Context that is now available
    // Across the Application

    const handleAuthData = (displayName, email) => {
        setAuthData({displayName, email});
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {

            // Utility Function already checks to see if user exists in database. Will always return a User Doc.
            if (user){
                createUserDocument(user
                )
            }
            setAuthData(user)
            console.log(user)

        });
        return unsubscribe;
    }, []);




    return (
        <AuthIntelContext.Provider value={{authData, handleAuthData}}>
            {children}
        </AuthIntelContext.Provider>

    )
}

export default UserProvider;