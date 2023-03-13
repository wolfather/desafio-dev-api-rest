import { Dispatch, SetStateAction, createContext, useState } from "react";
import { UserEntity } from "../entities/user";
import { ProviderProps } from "../utils/provider";

export interface UserContextProps {
    userLogged: UserEntity;
    setUserLogged: Dispatch<SetStateAction<UserEntity>>;
    isLogged: boolean;
    setIsLogged: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextProps>({
    userLogged: {} as UserEntity,
    setUserLogged: () => {},
    isLogged: false,
    setIsLogged: () => {},
});

export const UserProvider = ({children}: ProviderProps) => {
    const [userLogged, setUserLogged] = useState<UserEntity>({} as UserEntity);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    return <UserContext.Provider 
        value={{userLogged, setUserLogged, isLogged, setIsLogged}}>
        {children}
    </UserContext.Provider>
}