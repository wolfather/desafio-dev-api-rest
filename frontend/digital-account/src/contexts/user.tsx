import { Dispatch, SetStateAction, createContext, useState } from "react";
import { UserEntity } from "../entities/user";
import { ProviderProps } from "../utils/provider";

export interface UserContextProps {
    userLogged: UserEntity;
    setUserLogged: Dispatch<SetStateAction<UserEntity>>;
}

export const UserContext = createContext<UserContextProps>({
    userLogged: {} as UserEntity,
    setUserLogged: () => {},
});

export const UserProvider = ({children}: ProviderProps) => {
    const [userLogged, setUserLogged] = useState<UserEntity>({} as UserEntity);

    return <UserContext.Provider value={{userLogged, setUserLogged}}>
        {children}
    </UserContext.Provider>
}