import express, { Application, Router } from 'express'
import cors from 'cors';
import { RouterAdapter } from '../adapter/routeradapter';
import { CreateUserUsecase } from '../user/usecase/create_user';
import { CreateUserPresenter } from '../user/presenter/create_user';
import { UserInfraImp } from '../user/implementation/user_infra_implementation';
import bodyParser from 'body-parser';

export class App {
    private _app: Application;

    get app(): Application {
        return this._app;
    }

    constructor(private readonly userDb: UserInfraImp) {
        this._app = express();

        this._routerSetup();
        this._config();
        this._routerSetup()
            .then(routes => {
                this._app
                    .use(cors({origin: '*'}))
                    .use(routes)
                    .use(express.json())
                    .use(bodyParser.json())
                    .use(bodyParser.urlencoded({extended: true}))
            }).catch(function(err) {
                console.log({err})
            });
    }

    private _config(): void {
        this._app.options('*', cors());

    }

    private async _routerSetup(): Promise<Router> {

        const router = Router();
        const routerAdapter = new RouterAdapter();

        const createUserUseCase = new CreateUserUsecase(this.userDb);

        router.post(
            '/user', 
            await routerAdapter.adapt(new CreateUserPresenter(createUserUseCase))
        )

        return router;
    }
}