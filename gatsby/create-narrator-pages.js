'use strict';

const { slugs, strings } = require('../src/utils/localization');
const kebabCase = require('lodash/kebabCase');
const path = require('path');
const { write } = require('./utils/slug-json-writer')

module.exports = async (graphql, actions) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { fields: { narrator: { ne: null } } }) {
                group(field: fields___narrator) {
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

    for (const group of result.data.allMarkdownRemark.group) {
        const slug = `/${kebabCase(group.fieldValue)}${slugs.all}`;

        write(slug, group.edges)

        createPage({
            path: slug,
            component: path.resolve('./src/templates/feed-template.js'),
            context: {
                title: `${strings.audioStories} ${strings.with} ${group.fieldValue}`,
                layout: 'branch',
                slug
            }
        });
    };
};
