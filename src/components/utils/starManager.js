import ls from 'local-storage';

const STARS = 'stars';
const PATHPREFIXSTRING = process.env.GATSBY_PATH_PREFIX || '';

const toPath = (slug) => {
    return `${PATHPREFIXSTRING}${slug}`;
}

export const getStars = () => {
    let stars = ls(STARS);

    if (stars === null) {
        return [];
    }

    if (PATHPREFIXSTRING === '/sv') {
        stars = stars.filter(star => star.path && star.path.startsWith('/sv'))
    } else {
        stars = stars.filter(star => star.path && !star.path.startsWith('/sv'))
    }

    return stars;
}

export const addStarPath = (path, value) => {
    if (isStar(path)) {
        return;
    }

    let stars = ls(STARS);

    const data = { path, value };

    if (stars === null) {
        stars = [data]
    } else {
        stars.unshift(data)
    }

    ls(STARS, stars);
}

export const addStar = (slug, value) => {
    const path = toPath(slug);

    addStarPath(path, value);
}

export const removeStarPath = (path) => {
    let stars = ls(STARS);

    if (stars === null) {
        return;
    }

    if (!isStar(path)) {
        return;
    }

    const star = stars.find(x => x.path === path);

    if (star !== undefined) {
        stars.splice(stars.indexOf(star), 1);
    }

    if (stars.length === 0) {
        ls(STARS, null)
    } else {
        ls(STARS, stars)
    }
}

export const removeStar = (slug) => {
    const path = toPath(slug);

    removeStarPath(path);
}

export const isStarSlug = (slug) => {
    const stars = ls(STARS);

    if (stars === null) {
        return false;
    }

    return stars.includes(x => x && x.slug === toPath(slug))
}

export const isStar = (path) => {
    const stars = ls(STARS);

    if (stars === null) {
        return false;
    }

    const star = stars.find(x => x.path === path);

    if (star === undefined) {
        return false;
    }

    return process.env.NODE_ENV === "development" || star.path.startsWith(PATHPREFIXSTRING)
}

export const getStar = (path) => {
    const stars = ls(STARS);

    if (stars === null) {
        return false;
    }

    const star = stars.find(x => x.path === path);

    if (star === undefined) {
        return false;
    }

    if (process.env.NODE_ENV === "development" || star.path.startsWith(PATHPREFIXSTRING)) {
        return star;
    } 

    return false;
}

