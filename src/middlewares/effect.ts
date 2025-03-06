import { Dispatch, AnyAction, MiddlewareAPI } from 'redux';
import XRedux from 'src/core/xredux';

function createEffectMiddleware(context: XRedux) {
  return ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
    const { effects } = context;
    if (typeof effects[action.type] === 'function') {
      return effects[action.type](action, dispatch, getState);
    }
    return next(action);
  };
}

export default createEffectMiddleware;
