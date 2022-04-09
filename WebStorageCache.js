// 默认过期时间 七天 单位秒
const defaultExpire = 7 * 24 * 60 * 60;
const storageMap = new Map();

/*
* 本地缓存存储
* @param {String} [namespace='global'] - 命名空间
* @param {String} [storage='localStorage'] - 存储对象类型(localStorage/sessionStorage)
* @return {Object} - 缓存类
 */
const createWebStorageCache = function (namespace = '', storage = 'localStorage') {
  const _namespace = namespace || '';
  const storageInstanceKey = `${_namespace}_${storage}`;

  if (storageMap.has(storageInstanceKey)) {
    return storageMap.get(storageInstanceKey);
  }

  const getStorage = function () {
    if (window[storage] && window[storage] instanceof Storage) {
      return window[storage];
    }
    throw new Error(`${storage} is not a Storage`);
  };

  const _storage = getStorage();

  /*
  * @param {String} key - 存储的key
  * @return {String} - 实际存储的key
  */
  const getKey = (key) => {
    return _namespace ? `${_namespace}_${key}` : key;
  };

  /*
  * 缓存类
  * */
  const WebStorageCache = function () {

  };

  /*
  * 设置缓存
  * @param {String} key - 键
  * @param {String} value - 值
  * @param {Number} [expire=defaultExpire] - 过期时间(单位秒)
  * */
  WebStorageCache.prototype.set = function (key, value, expire = defaultExpire) {
    const _key = getKey(key);
    const _value = JSON.stringify({
      value,
      expire: typeof expire === "number" ? Date.now() + expire * 1000 : null
    });
    _storage.setItem(_key, _value);
  };

  /*
  * 获取缓存 - 如果不存在返回null 如果过期将清除缓存并返回null
  * @param {String} key - 键
  * @return {*} - 值
   */
  WebStorageCache.prototype.get = function (key) {
    const _key = getKey(key);
    const _value = _storage.getItem(_key);
    if (!_value) {
      return null;
    }
    const {value, expire} = JSON.parse(_value);
    if (expire < Date.now()) {
      this.remove(key);
      return null;
    }
    return value;
  };

  /*
  * 删除缓存
  * @param {String} key - 键
   */
  WebStorageCache.prototype.remove = function (key) {
    const _key = getKey(key);
    _storage.removeItem(_key);
  };

  /*
  * 删除缓存
  * @param {String[]} keys - 要删除的缓存键数组
   */
  WebStorageCache.prototype.removeItems = function (keys) {
    if (!Array.isArray(keys)) {
      return;
    }
    keys.forEach(key => {
      this.remove(key);
    });
  };

  const storageInstance = new WebStorageCache();
  storageMap.set(storageInstanceKey, storageInstance);
  return storageInstance;
}


export default createWebStorageCache;