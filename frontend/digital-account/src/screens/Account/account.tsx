import { FC } from "react";
import { Link } from "react-router-dom";


export const Account: FC<{}> = () => {

    return (
        <div>
            Account
            <Link to='/login'>Logout</Link>
        </div>
    )
}