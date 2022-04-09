import webStorageCache from "./WebStorageCache.js";

// 系统缓存 主题、状态等
export const storageCacheApp = webStorageCache('app');
// 用户缓存 离线数据等
export const storageCacheUser = webStorageCache('user');
