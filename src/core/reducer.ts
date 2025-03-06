import { combineReducers, AnyAction, ReducersMapObject, Reducer } from 'redux';

export default {
  getReducer(reducers: ReducersMapObject, initialState: any = null): Reducer {
    return (state = initialState, action: AnyAction) => {
      if (typeof reducers[action.type] === 'function') {
        return reducers[action.type](state, action);
      }
      return state;
    };
  },
  createReducer(injectedReducers: {
    [key: string]: Reducer;
  }): Reducer {
    return combineReducers({
      ...injectedReducers,
    });
  },
};
