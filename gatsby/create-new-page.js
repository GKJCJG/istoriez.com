const path = require('path');
const { slugs, strings } = require('../src/utils/localization');
const { write } = require('./utils/slug-json-writer')

module.exports = async (graphql, actions) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allMarkdownRemark(sort: {fields: fields___modified, order: DESC}, filter: { frontmatter: { author: { ne: null } } }, limit: 10){
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

    write(slugs.newStories, result.data.allMarkdownRemark.edges)

    createPage({
        path: slugs.newStories,
        component: path.resolve('./src/templates/feed-template.js'),
        context: {
            title: `${strings.newStories}`,
            layout: 'branch',
            slug: slugs.newStories,
            extra: "modified"
        }
    });
};
