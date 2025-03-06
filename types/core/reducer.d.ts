import { AnyAction, ReducersMapObject, Reducer } from 'redux';
declare const _default: {
    getReducer(reducers: ReducersMapObject<any, import("redux").Action<any>>, initialState?: any): Reducer<any, AnyAction>;
    createReducer(injectedReducers: {
        [key: string]: Reducer<any, AnyAction>;
    }): Reducer<any, AnyAction>;
};
export default _default;
