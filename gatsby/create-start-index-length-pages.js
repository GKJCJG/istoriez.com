'use strict';

const path = require('path');
const { strings, slugs } = require('../src/utils/localization');
const { write } = require('./utils/slug-json-writer')
const { ageString, slugString } = require('./utils/slug-string-generator')

const forLengthResult = async (age, lengthPage, graphql) => {
    let result;

    result = age === '' ?
        await graphql(`
                query yaya($gte: Int, $lte: Int) {
                    allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null } }, timeToRead: { gte: $gte, lte: $lte } }) {
                        edges {
                            node {
                                fields {
                                    slug
                                }
                            }
                        }
                    }
                }
                `, { gte: lengthPage.gte, lte: lengthPage.lte })
        :
        await graphql(`
                query yayb($gte: Int, $lte: Int, $age: String) {
                    allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null }, age: { eq: $age } }, timeToRead: { gte: $gte, lte: $lte } }) {
                        edges {
                            node {
                                fields {
                                    slug
                                }
                            }
                        }
                    }
                }
                `, { gte: lengthPage.gte, lte: lengthPage.lte, age });


    return result;
}

const mostReadPageResult = async (age, graphql) => {
    let result;

    result = age === '' ?
        await graphql(`
                query dadaa {
                    allMarkdownRemark(sort: {fields: fields___viewsLastMonth, order: DESC}, filter: { frontmatter: { author: { ne: null } }, fields: { viewsLastMonth: { ne: null } } }) {
                        edges {
                            node {
                                fields {
                                    slug
                                }
                            }
                        }
                    }
                }
                `)
        :
        await graphql(`
                query dadab($age: String) {
                    allMarkdownRemark(sort: {fields: fields___viewsLastMonth, order: DESC}, filter: { frontmatter: { author: { ne: null }, age: { eq: $age }  }, fields: { viewsLastMonth: { ne: null } } }) {
                        edges {
                            node {
                                fields {
                                    slug
                                }
                            }
                        }
                    }
                }
                `, { age });

    return result;
}

module.exports = async (graphql, actions) => {
    const { createPage } = actions;

    const ages = ['', '0-3', '4-6', '7-12']

    const lengthPages = [
        {
            slugPart: slugs.shortStories,
            gte: 0,
            lte: 2,
            title: strings.shortStories
        },
        {
            slugPart: slugs.mediumStories,
            gte: 3,
            lte: 6,
            title: strings.mediumStories
        },
        {
            slugPart: slugs.longStories,
            gte: 7,
            lte: 19,
            title: strings.longStories
        }
    ]

    for (const age of ages) {
        for (const lengthPage of lengthPages) {
            const result = await forLengthResult(age, lengthPage, graphql)

            const slug = slugString('', age, lengthPage.slugPart)

            write(slug, result.data.allMarkdownRemark.edges)

            const chips = []
                
            if (age === '') {
                chips.push({ link: lengthPage.slugPart, closeLink: slugString('', age, slugs.all), label: lengthPage.title });
            } else {
                chips.push({ link: lengthPage.slugPart, closeLink: slugString('', age, slugs.all), label: lengthPage.title });
                chips.push({ link: slugString('', age, slugs.all), closeLink: lengthPage.slugPart, label: `${age} ${strings.years}` })
            }

            createPage({
                path: slug,
                component: path.resolve('./src/templates/feed-template.js'),
                context: {
                    layout: 'branch',
                    title: `${lengthPage.title}${ageString(age)}`,
                    slug,
                    chips
                }
            })
        }

        const mostReadResult = await mostReadPageResult(age, graphql)

        const mostReadSlug = slugString('', age, slugs.mostReadStories)

        write(mostReadSlug, mostReadResult.data.allMarkdownRemark.edges)

        createPage({
            path: mostReadSlug,
            component: path.resolve('./src/templates/feed-template.js'),
            context: {
                layout: 'branch',
                title: `${strings.mostReadStories}${ageString(age)}`,
                slug: mostReadSlug,
                extra: "pageviews"
            }
        })
    }

};
