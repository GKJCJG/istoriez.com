'use strict';

const kebabCase = require('lodash/kebabCase');
const path = require('path');

module.exports = async (graphql, actions) => {
    const { createPage } = actions;

    const indexResult = await graphql(`
                {
                    allMarkdownRemark(filter: { frontmatter: { author: { ne: null } } }) {
                        group(field: frontmatter___age) {
                            fieldValue
                        }
                    }
                }
            `);

    createPage({
        path: '/',
        component: path.resolve('./src/templates/start/index-template.js'),
        context: {
            layout: 'main',
            prefix: '',
            start: true,
            ages: indexResult.data.allMarkdownRemark.group.map(x => x.fieldValue)
        }
    });

    const result = await graphql(`
        {
            allMarkdownRemark(filter: { frontmatter: { age: { ne: null } } }) {
                group(field: frontmatter___age) {
                    fieldValue
                }
            }
        }
    `);

    for (const group of result.data.allMarkdownRemark.group) {
        const slug = `/${kebabCase(group.fieldValue)}/`;

        createPage({
            path: slug,
            component: path.resolve('./src/templates/start/age-template.js'),
            context: {
                layout: 'main',
                start: true,
                prefix: `/${kebabCase(group.fieldValue)}`,
                age: group.fieldValue,
                ages: result.data.allMarkdownRemark.group.map(x => x.fieldValue)
            }
        });
    }
};
