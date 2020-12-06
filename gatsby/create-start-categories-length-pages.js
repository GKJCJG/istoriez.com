'use strict';

const path = require('path');
const { strings, slugs } = require('../src/utils/localization');
const { write } = require('./utils/slug-json-writer')
const { tagString, ageString, slugString } = require('./utils/slug-string-generator')

const forLengthResult = async (tag, age, lengthPage, graphql) => {
    let result;


    result = age === '' ?
        await graphql(`
            query yayc($gte: Int, $lte: Int, $tag: String) {
                allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null }, tags: { in: [$tag] }  }, timeToRead: { gte: $gte, lte: $lte } }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
            `, { gte: lengthPage.gte, lte: lengthPage.lte, tag })
        :
        await graphql(`
            query yayd($gte: Int, $lte: Int, $age: String, $tag: String) {
                allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null }, age: { eq: $age }, tags: { in: [$tag] }  }, timeToRead: { gte: $gte, lte: $lte } }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
            `, { gte: lengthPage.gte, lte: lengthPage.lte, age, tag });

    return result;
}

const mostReadPageResult = async (tag, age, graphql) => {
    let result;


    result = age === '' ?
        await graphql(`
            query dadac($tag: String) {
                allMarkdownRemark(sort: {fields: fields___viewsLastMonth, order: DESC}, filter: { frontmatter: { author: { ne: null }, tags: { in: [$tag] }  }, fields: { viewsLastMonth: { ne: null } } }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
            `, { tag })
        :
        await graphql(`
            query dadad($age: String, $tag: String) {
                allMarkdownRemark(sort: {fields: fields___viewsLastMonth, order: DESC}, filter: { frontmatter: { author: { ne: null }, age: { eq: $age }, tags: { in: [$tag] }   }, fields: { viewsLastMonth: { ne: null } } }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
            `, { age, tag });

    return result;
}

const allResult = async (tag, age, graphql) => {
    let result;


    result = age === '' ?
        await graphql(`
            query gaga($tag: String) {
                allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null }, tags: { in: [$tag] } } }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
            `, { tag })
        :
        await graphql(`
            query gsgs($age: String, $tag: String) {
                allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null }, age: { eq: $age }, tags: { in: [$tag] } } }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
            `, { age, tag });

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

    const tagsResult = await graphql(`
    {
        allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null } } }) {
            group(field: frontmatter___tags) {
                fieldValue
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    }
    `);

    const tags = tagsResult.data.allMarkdownRemark.group.map(x => x.fieldValue)

    for (const tag of tags) {
        for (const age of ages) {
            for (const lengthPage of lengthPages) {
                const result = await forLengthResult(tag, age, lengthPage, graphql)

                const slug = slugString(tag, age, lengthPage.slugPart)

                write(slug, result.data.allMarkdownRemark.edges)

                const chips = [
                    { link: lengthPage.slugPart, closeLink: slugString(tag, age, slugs.all), label: lengthPage.title },
                    { link: slugString('', tag, slugs.all), closeLink: slugString('', age, lengthPage.slugPart), label: tag }
                ]

                if (age !== '') {
                    chips.push({ link: slugString('', age, slugs.all), closeLink: slugString('', tag, lengthPage.slugPart), label: `${age} ${strings.years}` })
                }

                createPage({
                    path: slug,
                    component: path.resolve('./src/templates/feed-template.js'),
                    context: {
                        layout: 'branch',
                        title: `${lengthPage.title}${tagString(tag)}${ageString(age)}`,
                        slug,
                        chips
                    }
                })
            }

            const mostReadResult = await mostReadPageResult(tag, age, graphql)

            const mostReadSlug = slugString(tag, age, slugs.mostReadStories)

            write(mostReadSlug, mostReadResult.data.allMarkdownRemark.edges)

            createPage({
                path: mostReadSlug,
                component: path.resolve('./src/templates/feed-template.js'),
                context: {
                    layout: 'branch',
                    title: `${strings.mostReadStories}${tagString(tag)}${ageString(age)}`,
                    slug: mostReadSlug,
                    extra: "pageviews"
                }
            })

            
            const all = await allResult(tag, age, graphql)

            const allSlug = slugString(tag, age, slugs.all)

            write(allSlug, all.data.allMarkdownRemark.edges)

            const allChips = [
                { link: slugString('', tag, slugs.all), closeLink: slugString('', age, slugs.all), label: tag }
            ]

            if (age !== '') {
                allChips.push({ link: slugString('', age, slugs.all), closeLink: slugString('', tag, slugs.all), label: `${age} ${strings.years}` })
            }

            createPage({
                path: allSlug,
                component: path.resolve('./src/templates/feed-template.js'),
                context: {
                    layout: 'branch',
                    title: `${strings.stories}${tagString(tag)}${ageString(age)}`,
                    slug: allSlug,
                    chips: allChips
                }
            })
        }

    }
};
