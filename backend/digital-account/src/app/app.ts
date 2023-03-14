import express, { Application, Router } from 'express';
import cors from 'cors';
import { CreateUserUsecase } from '../user/usecase/create_user';
import { CreateUserPresenter } from '../user/presenter/create_user';
import bodyParser from 'body-parser';
import { UserInfra } from '../infra/user_infra';
import { GetUserUsecase } from '../user/usecase/get_user';
import { GetUserPresenter } from '../user/presenter/get_user';
import { CreateAccountUsecase } from '../account/usecase/create_account';
import { AccountInfra } from '../infra/account_infra';
import { GetAccountPresenter } from '../account/presenter/get_account';
import { CreateAccountPresenter } from '../account/presenter/create_account';
import { GetAccountUsecase } from '../account/usecase/get_account';

export class App {
    app: Application;
    private userDb = new UserInfra();
    private accountDb = new AccountInfra();
    
    constructor() {
        this.app = express();

        this.app.options('*', cors());
        this.app
            .use(cors({origin: '*'}))
            .use(express.json())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({extended: true}))
            .use(this._routerSetup())
    }

    private _routerSetup(): Router {
        const router = Router();
        
        const createUserUseCase = new CreateUserUsecase(this.userDb);
        const createUserPresentation = new CreateUserPresenter(createUserUseCase);

        const getUserUsecase = new GetUserUsecase(this.userDb);
        const getUserPresenter = new GetUserPresenter(getUserUsecase);

        const createAccountUseCase = new CreateAccountUsecase(this.accountDb);
        const createAccountPresenter = new CreateAccountPresenter(createAccountUseCase);

        const getAccountUseCase = new GetAccountUsecase(this.accountDb);
        const getAccountPresenter = new GetAccountPresenter(getAccountUseCase);

        router
            .post('/create_user', async (req, res) => (
                await createUserPresentation.handle(req, res)
            ))
            .post('/get_user', async (req, res) => (
                await getUserPresenter.handle(req, res)
            ))
            .post('/create_account', async(req, res) => (
                await createAccountPresenter.handle(req, res)
            ))
            .post('/get_account', async(req, res) => (
                await getAccountPresenter.handle(req, res)
            ))

        return router;
    }
}
