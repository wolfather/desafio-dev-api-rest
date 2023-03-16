import express, { Application, Router } from 'express';
import cors from 'cors';
import { CreateUserUsecase } from '../user/domain/create_user';
import { CreateUserPresenter } from '../user/presenter/create_user';
import bodyParser from 'body-parser';
import { UserInfra } from '../infra/user_infra';
import { GetUserUsecase } from '../user/domain/get_user';
import { GetUserPresenter } from '../user/presenter/get_user';
import { CreateAccountUsecase } from '../account/domain/create_account';
import { AccountInfra } from '../infra/account_infra';
import { GetAccountPresenter } from '../account/presenter/get_account';
import { CreateAccountPresenter } from '../account/presenter/create_account';
import { GetAccountUsecase } from '../account/domain/get_account';
import { UpdateAccountUsecase } from '../account/domain/update_account';
import { UpdateAccountPresenter } from '../account/presenter/update_account';

export class App {
    app: Application;
    private userDb = new UserInfra();
    private accountDb = new AccountInfra();
    
    constructor() {
        this.app = express();

        this.app
            .options('*', cors())
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

        const updateAccountUseCase = new UpdateAccountUsecase(this.accountDb);
        const updateACcountPresenter = new UpdateAccountPresenter(updateAccountUseCase);

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
            .put('/update_account', async(req, res) => (
                await updateACcountPresenter.handle(req, res)
            ))


        return router;
    }
}
