import { AnyAction } from 'redux';

export interface Action<T = any, S = any> {
  type: T;
  payload: S;
};

export interface ActionCreator {
  (payload: any): AnyAction;
}

export interface ActionsMapObject {
  [key: string]: ActionCreator;
}
