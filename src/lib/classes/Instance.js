import { error } from '../log';
import { LoadQueue } from './LoadQueue';
import { isString, isObject, isNull, isArray, isEmpty } from '../util';
import { has } from '../util/objects';
import { locateAsset, toDataURL, inferMimeType } from '../data';

/**
 * Interface represents a requested item. This may be for a character, a whole party, GM tools etc.
 */
export class Instance {
  constructor() {
    this.loadQueue = new LoadQueue();
  }

  getAsset(asset, callback) {
    if (!isNull(asset) && isString(asset) && asset != "" && has(this.data.instances, asset)) {
      // log("Character", "getAsset: known instance", asset);
      asset = this.data.instances[asset];
    }

    if (asset === null) {
      // log("Character", "getAsset: null");
      return;
    } else if (isObject(asset)) {
      // log("Character", "getAsset: object");
      const dataURL = toDataURL(asset.data, asset.mimeType);
      callback(dataURL);
    } else if (isString(asset)) {
      // log("Character", "getAsset: string", asset);
      locateAsset(asset, assetFile => {
        this.loadQueue.loadEmbed(assetFile).then(data => {
          const mimeType = inferMimeType(asset);
          const dataURL = toDataURL(data, mimeType);
          callback(dataURL);
        })
      });
    } else {
      warn("Character", "Unknown asset", asset);
    }
  }

  /**
   * Render this instance as a file or files.
   * @returns {Promise} Promise representing the character sheet(s).
   */
  render() {
    error("Instance", "Not yet implemented!");
  }
}
