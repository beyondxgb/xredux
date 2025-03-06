import { AnyAction, Dispatch } from 'redux';
export declare type GetState = <S>() => {
    [key: string]: S;
};
export declare type Effect = (action: AnyAction, dispatch: Dispatch, getState: GetState) => Promise<void>;
export interface EffectsMapObject {
    [key: string]: Effect;
}
