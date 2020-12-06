import { strings } from './localization'

export const minToHours = (min) => {
    var hours = Math.floor(min / 60);
    var minutes = min % 60;

    return `${hours !== 0 ? `${hours} h ` : ''}${minutes} min`;
}

export const newStoriesTimeAgo = (date) => {

    const current = new Date()
    const previous = new Date(date)

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerWeek = msPerDay * 7;
    var msPerTwoWeeks = msPerDay * 7 * 2;
    var msPerThreeWeeks = msPerDay * 7 * 3;
    var msPerMonth = msPerDay * 30;
    var msPerTwoMonths = msPerDay * 30 * 2;
    var msPerYear = msPerDay * 365;  

    var elapsed = current - previous;

    if (elapsed < msPerWeek) {
        return strings.thisWeek;
    }

    if (elapsed < msPerTwoWeeks) {
        return `${Math.floor(elapsed / msPerWeek)} ${strings.weekAgo}`;
    }

    if (elapsed < msPerThreeWeeks) {
        return `${Math.floor(elapsed / msPerWeek)} ${strings.weeksAgo}`;
    }

    if (elapsed < msPerTwoMonths) {
        return `1 ${strings.monthAgo}`;
    }

    if (elapsed < msPerYear) {
        return `${ Math.round(elapsed / msPerMonth) } ${strings.monthsAgo}`;
    }

    return `${Math.round(elapsed / msPerYear)} ${strings.yearAgo}`;
}

export const latestReadsTimeAgo = (date) => {

    const current = new Date()
    const previous = new Date(date)

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerTwoDays = msPerDay * 2;
    var msPerWeek = msPerDay * 7;
    var msPerTwoWeeks = msPerDay * 7 * 2;
    var msPerMonth = msPerDay * 30;
    var msPerTwoMonths = msPerDay * 30 * 2;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerDay) {
        return strings.today;
    }

    if (elapsed < msPerTwoDays) {
        return strings.yesterday;
    }

    if (elapsed < msPerWeek) {
        return `${Math.round(elapsed / msPerDay)} ${strings.daysAgo}`;
    }

    if (elapsed < msPerTwoWeeks) {
        return `${Math.floor(elapsed / msPerWeek)} ${strings.weekAgo}`;
    }

    if (elapsed < msPerMonth) {
        return `${Math.round(elapsed / msPerWeek)} ${strings.weeksAgo}`;
    }

    if (elapsed < msPerTwoMonths) {
        return `${Math.floor(elapsed / msPerMonth)} ${strings.monthAgo}`;
    }

    if (elapsed < msPerYear) {
        return `${Math.round(elapsed / msPerMonth)} ${strings.monthsAgo}`;
    }

    return `${Math.round(elapsed / msPerYear)} ${strings.yearAgo}`;
}