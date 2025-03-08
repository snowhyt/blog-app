import {createContext, useContext, useState} from 'react';




export const AuthContext = createContext();

//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuthContext = () => {
    return useContext(AuthContext);
};



export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    return<AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
};
