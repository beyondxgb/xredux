import { Dispatch, AnyAction, MiddlewareAPI } from 'redux';
import XRedux from 'src/core/xredux';
declare function createEffectMiddleware(context: XRedux): ({ dispatch, getState }: MiddlewareAPI<Dispatch<AnyAction>, any>) => (next: Dispatch<AnyAction>) => (action: any) => any;
export default createEffectMiddleware;
