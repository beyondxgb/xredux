import { Reducer, Middleware } from 'redux';
import XRedux from './xredux';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}
export default function (this: XRedux, reducer?: Reducer, initialState?: any, externalMiddlewares?: Array<Middleware>): import("redux").Store<any, import("redux").AnyAction>;
