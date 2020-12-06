'use strict';

const kebabCase = require('lodash/kebabCase');
const path = require('path');

module.exports = async (graphql, actions) => {
    const { createPage } = actions;

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
        const authorSlug = `/${kebabCase(author)}/`;

        const result = await graphql(`
                query yoyo($author: String) {
                    allMarkdownRemark(filter: { frontmatter: { age: { ne: null }, author: { eq: $author } } }) {
                        group(field: frontmatter___age) {
                            fieldValue
                        }
                    }
                }
            `, { author: author });

        createPage({
            path: authorSlug,
            component: path.resolve('./src/templates/start/author-template.js'),
            context: {
                layout: 'main',
                author: author,
                start: true,
                prefix: `/${kebabCase(author)}`,
                ages: result.data.allMarkdownRemark.group.map(x => x.fieldValue)
            }
        });

        for (const group of result.data.allMarkdownRemark.group) {
            const slug = `/${kebabCase(author)}/${kebabCase(group.fieldValue)}/`;

            createPage({
                path: slug,
                component: path.resolve('./src/templates/start/author-age-template.js'),
                context: {
                    layout: 'main',
                    start: true,
                    prefix: `/${kebabCase(author)}/${kebabCase(group.fieldValue)}`,
                    age: group.fieldValue,
                    author,
                    ages: result.data.allMarkdownRemark.group.map(x => x.fieldValue)
                }
            });
        }
    }
};
