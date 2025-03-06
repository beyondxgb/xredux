import { ReducersMapObject } from 'redux';
import { EffectsMapObject } from './effects';
export interface Model {
    namespace: string;
    initialState?: any;
    reducers: ReducersMapObject;
    effects: EffectsMapObject;
}
