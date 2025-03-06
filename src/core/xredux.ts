import { combineReducers, ReducersMapObject, Middleware, AnyAction, Store  } from 'redux';
import { EffectsMapObject } from '../types/effects';
import { Model } from '../types/models';
import createStore from './createStore';
import reducerHelper from './reducer';
import actionHelper from './action';
import constants from '../constants';
import { prefixNamespace, isArray, isPlainObject } from '../utils';
import { ActionsMapObject } from 'src/types/actions';

const { SET_STATE } = constants;

const { getReducer, createReducer } = reducerHelper;

function filterReducers(reducers: ReducersMapObject): ReducersMapObject {
  if (!reducers) {
    return reducers;
  }
  return Object.keys(reducers)
    .reduce((acc: ReducersMapObject, action: string) => {
      if (typeof reducers[action] === 'function') {
        acc[action] = reducers[action];
      }
      return acc;
    }, {});
}

function filterEffects(effects: EffectsMapObject): EffectsMapObject {
  if (!effects) {
    return effects;
  }
  return Object.keys(effects)
    .reduce((acc: EffectsMapObject, action: string) => {
      if (typeof effects[action] === 'function') {
        acc[action] = effects[action];
      }
      return acc;
    }, {});
}

function validateModel(model: Model, models: Array<Model>): Model {
  const {
    namespace, initialState, reducers, effects,
  } = model;
  if (!namespace || typeof namespace !== 'string') {
    throw new Error(`Expected the model namespace to be a string. but got ${typeof namespace}`);
  }
  if (models.some((item: Model) => item.namespace === namespace)) {
    throw new Error(`Model "${namespace}" has been created, please select another name!`);
  }

  if (reducers !== undefined && !isPlainObject(reducers)) {
    throw new Error(`Expected the model reducers to be a plain object, but got ${typeof reducers}`);
  }

  if (effects !== undefined && !isPlainObject(effects)) {
    throw new Error(`Expected the model effects to be a plain object, but got ${typeof effects}`);
  }
  return {
    namespace,
    initialState,
    reducers: filterReducers(reducers),
    effects: filterEffects(effects),
  };
}

export default class XRedux {
  public reducers: ReducersMapObject = {};
  public effects: EffectsMapObject = {};
  public models: Array<Model> = [];
  public MEMORY_MODELS: Array<Model>= [];
  public actions: { [key: string]: ActionsMapObject } = {};
  public store: Store | null;
  public create: () => this = () => this;
  constructor() {
    this.store = null;
    this.createStore = this.createStore.bind(this);
    this.model = this.model.bind(this);
  }
  createStore(reducers: ReducersMapObject, initialState: any, externalMiddlewares: Array<Middleware>) {
    if (externalMiddlewares && !isArray(externalMiddlewares)) {
      throw new Error(`Expected the middlewares to be a array, but got ${typeof externalMiddlewares}`);
    }
    // create store
    const store = createStore.call(
      this,
      reducers ? combineReducers(reducers) : undefined,
      initialState,
      externalMiddlewares,
    );
    // init reducer
    if (reducers) {
      this.reducers = {
        ...reducers,
      };
    }
    // save store
    this.store = store;
    // init memory models
    if (this.MEMORY_MODELS.length > 0) {
      this.addModels(this.MEMORY_MODELS);
      this.MEMORY_MODELS = [];
    }
    return store;
  }
  addModels(models: Array<Model>): void {
    if (models && !isArray(models)) {
      throw new Error(`Expected the models to be a array, but got ${typeof models}`);
    }
    for (let i = 0; i < models.length; i += 1) {
      const m = models[i];
      const model = validateModel(m, this.models);
      const { namespace } = model;

      if (model.reducers && Object.keys(model.reducers).indexOf(SET_STATE) === -1) {
        // inject setState reducer to reducers
        // it can help to set state quickly in the effects
        model.reducers[SET_STATE] = (state: any, action: AnyAction) => ({
          ...state,
          ...action.payload,
        });
      }

      // prefix namespace to reducers and effects
      const reducers = prefixNamespace(namespace, model.reducers);
      const effects = prefixNamespace(namespace, model.effects);

      // inject reducer
      const finalReducer = getReducer(reducers, model.initialState);
      this.reducers[namespace] = finalReducer;

      // add effects
      this.effects = {
        ...this.effects,
        ...effects,
      };

      // add actions
      const actions = actionHelper.add(model, (this.store as Store).dispatch);
      this.actions[namespace] = actions;

      // save model
      this.models.push(model);
    }
    // update reducer in the store
    (this.store as Store).replaceReducer(createReducer(this.reducers));
  }
  model(m: Model): void {
    if (!this.store) {
      this.MEMORY_MODELS.push(m);
      return;
    }
    this.addModels([m]);
  }
}
