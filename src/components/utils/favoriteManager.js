import ls from 'local-storage';
import { clickEvent } from '../../utils/analytics'

const FAVORITES = 'favorites';
const PATHPREFIXSTRING = process.env.GATSBY_PATH_PREFIX || '';

const toPath = (slug) => {
    return `${PATHPREFIXSTRING}${slug}`;
}

export const toggleFavorite = (slug) => {
    const value = !isFavoriteSlug(slug);

    clickEvent("Favorite", slug, value)

    if (value) {
        addFavorite(slug);
    } else {
        removeFavorite(slug);
    }

    return value;
}

export const getFavorites = () => {
    let favorites = ls(FAVORITES);

    if (favorites === null) {
        return [];
    }

    if (PATHPREFIXSTRING === '/sv') {
        favorites = favorites.filter(favorite => favorite.startsWith('/sv'))
    } else {
        favorites = favorites.filter(favorite => !favorite.startsWith('/sv'))
    }

    return favorites;
}

export const addFavoritePath = (path) => {
    if (isFavorite(path)) {
        return;
    }

    let favorites = ls(FAVORITES);

    if (favorites === null) {
        favorites = [path]
    } else {
        favorites.unshift(path)
    }

    ls(FAVORITES, favorites);
}

export const addFavorite = (slug) => {
    const path = toPath(slug);

    addFavoritePath(path);
}

export const removeFavoritePath = (path) => {
    let favorites = ls(FAVORITES);

    if (favorites === null) {
        return;
    }

    if (!isFavorite(path)) {
        return;
    }

    const index = favorites.indexOf(path);

    if (index !== -1) {
        favorites.splice(index, 1);
    }

    if (favorites.length === 0) {
        ls(FAVORITES, null)
    } else {
        ls(FAVORITES, favorites)
    }
}

export const removeFavorite = (slug) => {
    const path = toPath(slug);
    
    removeFavoritePath(path);
}

export const isFavoriteSlug = (slug) => {
    const favorites = ls(FAVORITES);

    if (favorites === null) {
        return false;
    }

    const index = favorites.indexOf(toPath(slug));

    return index !== -1;
}

export const isFavorite = (path) => {
    const favorites = ls(FAVORITES);

    if (favorites === null) {
        return false;
    }

    const index = favorites.indexOf(path);

    if (index === -1) {
        return false;
    }

    return process.env.NODE_ENV === "development" || favorites[index].startsWith(PATHPREFIXSTRING)
}

