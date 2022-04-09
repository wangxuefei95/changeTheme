import { storageCacheApp } from "./storageCaches.js";

const themeMap = {
  light: {
    '--theme-bg': '#FFFFFF',
    '--theme-color': '#000000',
    '--theme-border-color': '#DDDDDD',
  },
  dark: {
    '--theme-bg': '#000000',
    '--theme-color': '#00FF00',
    '--theme-border-color': '#EFFF00',
  },
}


const useTheme = (theme = 'light') => {
  storageCacheApp.set('theme', theme, null);
  const themeStyle = themeMap[theme];
  Object.keys(themeStyle).forEach(key => {
    document.body.style.setProperty(key, themeStyle[key]);
  });
};

export default useTheme;