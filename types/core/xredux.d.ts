import { ReducersMapObject, Middleware, AnyAction, Store } from 'redux';
import { EffectsMapObject } from '../types/effects';
import { Model } from '../types/models';
import { ActionsMapObject } from 'src/types/actions';
export default class XRedux {
    reducers: ReducersMapObject;
    effects: EffectsMapObject;
    models: Array<Model>;
    MEMORY_MODELS: Array<Model>;
    actions: {
        [key: string]: ActionsMapObject;
    };
    store: Store | null;
    create: () => this;
    constructor();
    createStore(reducers: ReducersMapObject, initialState: any, externalMiddlewares: Array<Middleware>): Store<any, AnyAction>;
    addModels(models: Array<Model>): void;
    model(m: Model): void;
}
