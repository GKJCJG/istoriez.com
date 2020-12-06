const path = require("path")
const fs = require('fs');
const _ = require('lodash');

const removeFilePart = dirname => path.parse(dirname).dir

const write = (slug, edges) => {
    const json = edges.map(edge => edge.node.fields.slug)

    const file = `public${slug.slice(0, -1)}.json`

    fs.mkdirSync(removeFilePart(file), { recursive: true });

    fs.writeFileSync(file, JSON.stringify(json));

    return file;
}

const concatKebab = (baseSlug, value) => {
    return `${baseSlug}${_.kebabCase(value)}/`;
}

const concatKebab2 = (value, baseSlug) => {
    return `/${_.kebabCase(value)}${baseSlug}`;
}

module.exports = { write, concatKebab, concatKebab2 };