import { AccountProvider } from "../contexts/account"
import { UserProvider } from "../contexts/user"
import { ProviderProps } from "../utils/provider"


export const Providers = ({children}: ProviderProps) => {

    return <>
        <UserProvider>
            <AccountProvider>{children}</AccountProvider>
        </UserProvider>
    </>
}