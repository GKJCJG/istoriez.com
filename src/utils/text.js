import ls from 'local-storage';
import { clickEvent } from '../utils/analytics'

export const toggleUppercase = () => {
    var upperCase = isUppercase()
    if (upperCase) {
        ls("uppercase", false);
        clickEvent("Layout", "Uppercase", false)
        return false;
    } else {
        ls("uppercase", true);
        clickEvent("Layout", "Uppercase", true)
        return true;
    }
}

export const isUppercase = () => {
    return ls("uppercase");
}
