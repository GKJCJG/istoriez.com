import ls from 'local-storage';

const RECENTLY_READ = 'recentlyread';
const PATHPREFIXSTRING = process.env.GATSBY_PATH_PREFIX || '';

const toPath = (slug) => {
    return `${PATHPREFIXSTRING}${slug}`;
}

export const getRecentlyReads = () => {
    let recentlyRead = ls(RECENTLY_READ);

    if (recentlyRead === null) {
        return [];
    }

    if (PATHPREFIXSTRING === '/sv') {
        recentlyRead = recentlyRead.filter(recent => recent.path && recent.path.startsWith('/sv'))
    } else {
        recentlyRead = recentlyRead.filter(recent => recent.path && !recent.path.startsWith('/sv'))
    }

    return recentlyRead;
}

export const addRecentlyReadPath = (path) => {
    if (isRecentlyRead(path)) {
        return;
    }

    let recentlyRead = ls(RECENTLY_READ);

    const data = { path, date: new Date().toISOString() };

    if (recentlyRead === null) {
        recentlyRead = [data]
    } else {
        recentlyRead.unshift(data)
    }

    ls(RECENTLY_READ, recentlyRead);
}

export const addRecentlyRead = (slug) => {
    const path = toPath(slug);

    addRecentlyReadPath(path);
}

export const removeRecentlyReadPath = (path) => {
    let recentlyReads = ls(RECENTLY_READ);

    if (recentlyReads === null) {
        return;
    }

    if (!isRecentlyRead(path)) {
        return;
    }

    const recent = recentlyReads.find(x => x.path === path);

    if (recent !== undefined) {
        recentlyReads.splice(recentlyReads.indexOf(recent), 1);
    }

    if (recentlyReads.length === 0) {
        ls(RECENTLY_READ, null)
    } else {
        ls(RECENTLY_READ, recentlyReads)
    }
}

export const removeRecentlyRead = (slug) => {
    const path = toPath(slug);

    removeRecentlyReadPath(path);
}

export const isRecentlyReadSlug = (slug) => {
    const recentlyReads = ls(RECENTLY_READ);

    if (recentlyReads === null) {
        return false;
    }

    return recentlyReads.includes(x => x && x.slug === toPath(slug))
}

export const isRecentlyRead = (path) => {
    const recentlyReads = ls(RECENTLY_READ);

    if (recentlyReads === null) {
        return false;
    }

    const recent = recentlyReads.find(x => x.path === path);

    if (recent === undefined) {
        return false;
    }

    return process.env.NODE_ENV === "development" || recent.path.startsWith(PATHPREFIXSTRING)
}

