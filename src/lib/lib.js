import { Registry } from './classes/Registry';
import { Request } from './classes/Request';
import { loadSystemData } from './classes/System';
import { Events } from './classes/Events';
import { addAssetsDir as _addAssetsDir } from './data';
import { getFormData as getFormDataF } from './formdata';
import { addTranslator as addTranslatorF } from './i18n';

// start this first, it's the slow bit
loadSystemData([
  'common',
  'pathfinder2',
  'premium',
]);

const registry = new Registry();

export function create(chardesc) {
  const request = new Request(chardesc);
  const primary = request.getPrimaries(registry);
  return primary[0];
}

export function addAssetsDir(dir) {
  _addAssetsDir(dir);
}

export function addTranslator(callback) {
  addTranslatorF(callback);
}

export function onCreate(callback) {
  Events.createEvt.on(callback);
}

export function onCreateElementTree(callback) {
  Events.createElementTreeEvt.on(callback);
}

export function onError(callback) {
  Events.errorEvt.on(callback);
}

export const getFormData = getFormDataF;
