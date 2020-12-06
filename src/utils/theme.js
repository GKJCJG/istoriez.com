import ls from 'local-storage';
import { clickEvent } from '../utils/analytics'

export const toggleDarkTheme = () => {
    var element = document.body;
    if (element.classList.contains('dark')) {
        element.classList.remove('dark');
        var metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", "#FFF");
        ls("dark", false);
        clickEvent("Layout", "Dark", false)
        return false;
    } else {
        element.classList.add("dark");
        var metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", "#242424");
        ls("dark", true);
        clickEvent("Layout", "Dark", true)
        return true;
    }
}

export const isDarkTheme = () => {
    return ls("dark");
}