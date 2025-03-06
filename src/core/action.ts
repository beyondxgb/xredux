import { Dispatch } from 'redux';
import constants from '../constants';
import { Model } from '../types/models';
import { ActionCreator, ActionsMapObject } from 'src/types/actions';

const { SEP } = constants;

function actionCreator(namespace: string, actionName: string, dispatch: Dispatch): ActionCreator {
  return (payload: any) => (
    dispatch({
      type: `${namespace}${SEP}${actionName}`,
      payload,
    })
  );
}

export default {
  add(model: Model, dispatch: Dispatch): ActionsMapObject {
    const actions: ActionsMapObject= {};
    const { reducers = {}, effects = {}, namespace } = model;
    const validate = (actionName: string) => {
      if (actions[actionName]) {
        throw new Error(`Action name "${namespace}${SEP}${actionName}" has been duplicate defined! Please select another action name!`);
      }
    };
    Object.keys(reducers).forEach((actionName) => {
      validate(actionName);
      actions[actionName] = actionCreator(namespace, actionName, dispatch);
    });
    Object.keys(effects).forEach((actionName) => {
      validate(actionName);
      actions[actionName] = actionCreator(namespace, actionName, dispatch);
    });
    return actions;
  },
};

