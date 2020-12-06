'use strict';

const path = require('path');
const { slugs, strings } = require('../src/utils/localization');
const { write } = require('./utils/slug-json-writer')

module.exports = async (graphql, actions) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null } } }){
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    write(slugs.all, result.data.allMarkdownRemark.edges)

    createPage({
        path: slugs.all,
        component: path.resolve('./src/templates/feed-template.js'),
        context: {
            title: strings.allBedtimeStories,
            layout: 'branch',
            slug: slugs.all
        }
    });
};