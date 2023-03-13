import { HttpRequestAdapter } from "../adapter/httpadapter.interface";

export interface PresenterImp<T> {
    handle(req: Partial<HttpRequestAdapter>): Promise<Partial<T>>;
}
