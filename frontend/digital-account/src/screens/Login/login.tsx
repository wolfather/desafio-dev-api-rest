import { FC, FormEvent, useContext, useState } from "react";
import { UserContext } from "../../contexts/user";
import { Navigate, Link } from "react-router-dom";

export const Login: FC<{}> = () => {
    const [documentNumber, setDocumentNumber] = useState<string>('');
    const { setIsLogged, isLogged } = useContext(UserContext);
    const sendFormData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(e);
        if(documentNumber.length > 1) {
            setIsLogged(true);
            setDocumentNumber('');
        }
    }

    return (
        <div>
            <p>{String(isLogged)}</p>
            <form onSubmit={sendFormData}>
                <fieldset>
                    <label>
                        <input 
                            type="text" 
                            required
                            value={documentNumber}
                            onChange={(e) => setDocumentNumber(e.target.value)}
                            placeholder="insira seu CPF" />
                    </label>
                    <button type="submit" disabled={documentNumber.length < 1}>Entrar</button>

                    {isLogged ? <Navigate to="/account" replace={false} /> : <></>}

                </fieldset>
            </form>
        </div>
    )
}