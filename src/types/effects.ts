import { AnyAction, Dispatch } from 'redux';

export type GetState = <S>() => {
  [key: string]: S;
};

export type Effect = (action: AnyAction, dispatch: Dispatch, getState: GetState) => Promise<void>;

export interface EffectsMapObject {
  [key: string]: Effect;
};

