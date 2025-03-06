import constants from './constants';

const { SEP } = constants;

export function prefixNamespace(namespace: string, items: { [key: string] : any } = {}) {
  return Object.keys(items).reduce((acc: { [key: string]: any }, cur) => {
    acc[`${namespace}${SEP}${cur}`] = items[cur];
    return acc;
  }, {});
}

export const isArray = Array.isArray.bind(Array);

export const isPlainObject = require('is-plain-object'); // eslint-disable-line

