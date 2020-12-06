'use strict';

const path = require('path');
const { strings, slugs } = require('../src/utils/localization');
const { write } = require('./utils/slug-json-writer')
const { authorString, ageString, slugString } = require('./utils/slug-string-generator')

const forLengthResult = async (author, age, lengthPage, graphql) => {
    let result;


    result = age === '' ?
        await graphql(`
            query yayc($gte: Int, $lte: Int, $author: String) {
                allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { eq: $author }  }, timeToRead: { gte: $gte, lte: $lte } }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
            `, { gte: lengthPage.gte, lte: lengthPage.lte, author })
        :
        await graphql(`
            query yayd($gte: Int, $lte: Int, $age: String, $author: String) {
                allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { eq: $author }, age: { eq: $age }  }, timeToRead: { gte: $gte, lte: $lte } }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
            `, { gte: lengthPage.gte, lte: lengthPage.lte, age, author });

    return result;
}

const mostReadPageResult = async (author, age, graphql) => {
    let result;


    result = age === '' ?
        await graphql(`
            query dadac($author: String) {
                allMarkdownRemark(sort: {fields: fields___viewsLastMonth, order: DESC}, filter: { frontmatter: { author: { eq: $author }  }, fields: { viewsLastMonth: { ne: null } } }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
            `, { author })
        :
        await graphql(`
            query dadad($age: String, $author: String) {
                allMarkdownRemark(sort: {fields: fields___viewsLastMonth, order: DESC}, filter: { frontmatter: { author: { eq: $author }, age: { eq: $age }   }, fields: { viewsLastMonth: { ne: null } } }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
            `, { age, author });

    return result;
}

const allResult = async (author, age, graphql) => {
    let result;


    result = age === '' ?
        await graphql(`
            query yuyu($author: String) {
                allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { eq: $author }  } }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
            `, { author })
        :
        await graphql(`
            query udud($age: String, $author: String) {
                allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { eq: $author }, age: { eq: $age }   } }) {
                    edges {
                        node {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
            `, { age, author });

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

    const authorsResult = await graphql(`
    {
        allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null } } }) {
            group(field: frontmatter___author) {
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

    const authors = authorsResult.data.allMarkdownRemark.group.map(x => x.fieldValue)

    for (const author of authors) {
        for (const age of ages) {
            for (const lengthPage of lengthPages) {
                const result = await forLengthResult(author, age, lengthPage, graphql)

                const slug = slugString(author, age, lengthPage.slugPart)

                write(slug, result.data.allMarkdownRemark.edges)

                const chips = [
                    { link: lengthPage.slugPart, closeLink: slugString(author, age, slugs.all), label: lengthPage.title },
                    { link: slugString('', author, slugs.all), closeLink: slugString('', age, lengthPage.slugPart), label: author }
                ]

                if (age !== '') {
                    chips.push({ link: slugString('', age, slugs.all), closeLink: slugString('', author, lengthPage.slugPart), label: `${age} ${strings.years}` })
                }

                createPage({
                    path: slug,
                    component: path.resolve('./src/templates/author-template.js'),
                    context: {
                        author,
                        layout: 'branch',
                        title: `${lengthPage.title}${authorString(author)}${ageString(age)}`,
                        slug,
                        chips
                    }
                })
            }

            const mostReadResult = await mostReadPageResult(author, age, graphql)

            const mostReadSlug = slugString(author, age, slugs.mostReadStories)

            write(mostReadSlug, mostReadResult.data.allMarkdownRemark.edges)

            createPage({
                path: mostReadSlug,
                component: path.resolve('./src/templates/author-template.js'),
                context: {
                    author,
                    layout: 'branch',
                    title: `${strings.mostReadStories}${authorString(author)}${ageString(age)}`,
                    slug: mostReadSlug,
                    extra: "pageviews"
                }
            })



            const all = await allResult(author, age, graphql)

            const allSlug = slugString(author, age, slugs.all)

            write(allSlug, all.data.allMarkdownRemark.edges)

            const allChips = [
                { link: slugString('', author, slugs.all), closeLink: slugString('', age, slugs.all), label: author }
            ]

            if (age !== '') {
                allChips.push({ link: slugString('', age, slugs.all), closeLink: slugString('', author, slugs.all), label: `${age} ${strings.years}` })
            }

            createPage({
                path: allSlug,
                component: path.resolve('./src/templates/author-template.js'),
                context: {
                    author,
                    layout: 'branch',
                    title: `${strings.stories}${authorString(author)}${ageString(age)}`,
                    slug: allSlug,
                    chips: allChips
                }
            })
        }

    }
};
