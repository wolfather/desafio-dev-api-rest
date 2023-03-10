import { Dispatch, SetStateAction, createContext, useState } from "react";
import { AccountEntity } from "../entities/account";
import { ProviderProps } from "../utils/provider";

export interface AccountContextProps {
    account: AccountEntity;
    setAccount: Dispatch<SetStateAction<AccountEntity>>;
}

export const AccountContext = createContext<AccountContextProps>({
    account: {} as AccountEntity,
    setAccount: () => {}
})

export const AccountProvider = ({children}: ProviderProps) => {
    const [account, setAccount] = useState<AccountEntity>({} as AccountEntity);

    return <AccountContext.Provider value={{account, setAccount}}>
        {children}
    </AccountContext.Provider>
}