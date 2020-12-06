'use strict';

const kebabCase = require('lodash/kebabCase');
const path = require('path');

module.exports = async (graphql, actions) => {
    const { createPage } = actions;

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
        const categorySlug = `/${kebabCase(tag)}/`;

        const result = await graphql(`
                query yoyo($tag: String) {
                    allMarkdownRemark(filter: { frontmatter: { age: { ne: null }, tags: { in: [$tag] } } }) {
                        group(field: frontmatter___age) {
                            fieldValue
                        }
                    }
                }
            `, { tag });

        createPage({
            path: categorySlug,
            component: path.resolve('./src/templates/start/category-template.js'),
            context: {
                layout: 'main',
                tag,
                start: true,
                prefix: `/${kebabCase(tag)}`,
                ages: result.data.allMarkdownRemark.group.map(x => x.fieldValue)
            }
        });

        for (const group of result.data.allMarkdownRemark.group) {
            const slug = `/${kebabCase(tag)}/${kebabCase(group.fieldValue)}/`;

            createPage({
                path: slug,
                component: path.resolve('./src/templates/start/category-age-template.js'),
                context: {
                    layout: 'main',
                    age: group.fieldValue,
                    tag,
                    start: true,
                    prefix: `/${kebabCase(tag)}/${group.fieldValue}`,
                    ages: result.data.allMarkdownRemark.group.map(x => x.fieldValue)
                }
            });
        }
    }
};
