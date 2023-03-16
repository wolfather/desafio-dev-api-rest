import { GetUsersUseCase } from '../../../src/user/domain/getusersusecase';
import { GetUsersPresenter } from '../../../src/user/presentation/getuserspresenter';
import { mockValidUser } from '../../__mock__/user.mock';
import { UserEntity } from '../../../src/user/entity/user.entity';
import { UseCaseImp } from '../../../src/implementation/usecase.imp';
import { PresenterImp } from '../../../src/implementation/presenter.imp';
import { HttpRequestAdapter, HttpResponseAdapter } from '../../../src/presentation/adapter/httpadapter.interface';
import { MockDbImp } from '../implementation/mockdb';
import { ERROR_CODE, ERROR_MESSAGE, ERROR_NUM } from '../../../src/utils/factory/errorresponsefactory';
import { UserDBImp } from '../../../src/user/implementation/db.imp';

const usersList = mockValidUser(2) as UserEntity[];

let req: HttpRequestAdapter = {
	query: {id: '1'} as HttpRequestAdapter['query'],
	params: {id:'id=1'} as HttpRequestAdapter['params'],
	body: {} as HttpRequestAdapter['body']
} as HttpRequestAdapter;

describe('GetUsersPresenter', () => {
	let db: UserDBImp;
	let usecase: UseCaseImp<UserEntity>;
	let presenter: PresenterImp<Partial<HttpResponseAdapter<UseCaseImp<UserEntity>>>>;
	let spyUseCaseExecute: any;

	beforeEach(async() => {
		db = new MockDbImp();
		usecase= new GetUsersUseCase(db);
		presenter = new GetUsersPresenter(usecase);
		spyUseCaseExecute = jest.spyOn(usecase, 'execute');
	});

	afterEach(async() => {
		spyUseCaseExecute.mockClear().mockReset().mockRestore();
	});

	it('should assert the instance and method on controler', () => {
		expect(presenter).toBeInstanceOf(GetUsersPresenter);
		expect(presenter.handle).toBeDefined();
	})

	it('should call usecase.execute with success and users', async() => {
		spyUseCaseExecute.mockResolvedValue({
			success: true,
			data : usersList,
			code: ERROR_CODE.OK
		});

		const input = req.params;
		const result = await presenter.handle(req);
		console.log("---------::::>>>", {result})
		
		expect(result.statusCode).toBe(ERROR_NUM.OK);
		expect((result.data as UserEntity[]).length).toBeGreaterThanOrEqual(1);
		expect(spyUseCaseExecute).toHaveBeenNthCalledWith(1, 'id=1');
	});

	it('should test handle with invalid parameter', async() => {
		req.params = ({id: undefined} as any);

		const {message, statusCode} = await presenter.handle(req);

		expect(message).toBe(ERROR_MESSAGE.SERVER)
		expect(statusCode).toBe(ERROR_NUM.SERVER)

		expect(spyUseCaseExecute).not.toBeCalled();
	});

	it('should call usecase.execute no users provided and 400 statusCode', async() => {
		req.params.id = '';

		spyUseCaseExecute
			.mockResolvedValue({
				statusCode: ERROR_CODE.BAD_REQUEST,
			});

		const input = req.query.id;
		const {message, statusCode} = await presenter.handle(req);

		expect(spyUseCaseExecute).not.toBeCalled();
		expect(message).toBe(ERROR_MESSAGE.BAD_REQUEST);
		expect(statusCode).toBe(ERROR_NUM.BAD_REQUEST);
	});

	it('should return statusCode 500 when invalid param were provided', async() => {
		spyUseCaseExecute
			.mockResolvedValue({
				statusCode: ERROR_CODE.SERVER
			});

		req.params.id = (undefined as any);

		const {statusCode} = await presenter.handle(req);
		
		expect(statusCode).toBe(ERROR_NUM.SERVER);
		expect(spyUseCaseExecute).not.toBeCalled();
	});
});
