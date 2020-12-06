'use strict';

const path = require('path');
const { strings, slugs } = require('../src/utils/localization');
const { write } = require('./utils/slug-json-writer')
const { ageString, slugString } = require('./utils/slug-string-generator')

const ageResult = async (age, graphql) => {
    let result;

    result =
        await graphql(`
            query sese($age: String) {
                allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null }, age: { eq: $age } } }) {
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

    const ages = ['0-3', '4-6', '7-12']

    for (const age of ages) {
        const result = await ageResult(age, graphql)

        const slug = slugString('', age, slugs.all)

        write(slug, result.data.allMarkdownRemark.edges)

        const chips = [
            { link: slugString('', age, slugs.all), closeLink: slugs.all, label: `${age} ${strings.years}` }
        ]

        createPage({
            path: slug,
            component: path.resolve('./src/templates/feed-template.js'),
            context: {
                layout: 'branch',
                title: `${strings.stories}${ageString(age)}`,
                slug,
                chips
            }
        })
    }
};
