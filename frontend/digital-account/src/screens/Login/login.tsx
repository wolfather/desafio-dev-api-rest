import { FC } from "react";

export const Login: FC<{}> = () => {

    return (
        <div>
            <form>
                <fieldset>
                    <label>
                        <input 
                            type="text" 
                            required
                            placeholder="insira seu CPF" />
                    </label>
                    <button type="submit">Entrar</button>
                </fieldset>
            </form>
        </div>
    )
}