const _ = require('lodash');
const { strings, slugs } = require('../../src/utils/localization');

const tagString = tag => {
    return tag ? ` ${strings.about} ${process.env.GATSBY_SITE_LANG ? tag : tag.toLowerCase()}` : ''
}

const authorString = author => {
    return author ? ` ${strings.by} ${author}` : ''
}

const ageString = age => {
    return age ? ` ${age} ${strings.years}` : ''
}

const slugString = (arg1, arg2, slug) => {
    return `${arg1 ? `/${_.kebabCase(arg1)}` : ''}${arg2 ? `/${_.kebabCase(arg2)}` : ''}${slug}`
}

module.exports = { tagString, authorString, ageString, slugString };