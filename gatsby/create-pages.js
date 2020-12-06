'use strict';

const fs = require('fs');
const path = require('path');
const kebabCase = require('lodash/kebabCase');
const createNarratorPages = require('./create-narrator-pages.js');
const createStartIndexLengthPages = require('./create-start-index-length-pages.js');
const createStartIndexPages = require('./create-start-index-pages.js');
const createStartCategoriesLengthPages = require('./create-start-categories-length-pages.js')
const createAgePages = require('./create-age-pages.js')
const createStartCategoriesPages = require('./create-start-categories-pages.js');
const createStartAuthorsLengthPages = require('./create-start-authors-length-pages.js')
const createStartAuthorsPages = require('./create-start-authors-pages.js');
const createNewPage = require('./create-new-page.js')
const createAllPage = require('./create-all-page.js')
const { slugs, strings } = require('../src/utils/localization');

const createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    // TODO: Rename branch to feed

    const creator = (slug, template, layout) => {
        createPage({
            path: slug,
            component: path.resolve(`./src/templates/${template}.js`),
            context: { layout }
        });
    }

    createPage({
        path: '/404',
        component: path.resolve('./src/templates/not-found-template.js')
    });

    if (process.env.GATSBY_COVERS) {
        creator('/images/', 'images-template', 'branch')
        creator('/scattered/', 'images-scattered-template', 'none')
        return;
    }

    creator(slugs.audioStories, 'audio-stories-template', 'main')
    creator(slugs.yourLibrary, 'library-template', 'main')
    creator(slugs.menu, 'menu-template', 'main')
    creator(slugs.search, 'search-template', 'none')
    creator(slugs.feedback, 'feedback-template', 'page')
    creator(slugs.languages, 'language-template', 'page')
    creator(slugs.settings, 'settings-template', 'page')
    creator(slugs.authors, 'author-list-template', 'page')
    creator(slugs.ages, 'age-list-template', 'page')
    creator(slugs.narrators, 'narrator-list-template', 'page')
    creator(slugs.categories, 'category-list-template', 'page')

    const result = await graphql(`
    {
        allMarkdownRemark {
            edges {
                node {
                    timeToRead
                    excerpt
                    frontmatter {
                        template
                        title
                        author
                        tags
                        age
                    }
                    fields {
                        slug
                        authorSlug
                        viewsLastMonth
                        stars
                        starVotes
                        modified
                        audio {
                            publicURL
                        }
                        cover {
                            childImageSharp {
                                fixed(width: 150) {
                                    src
                                    srcSet
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    `);

    const { edges } = result.data.allMarkdownRemark;

    for (const edge of edges) {
        const { slug } = edge.node.fields

        if (edge.node.frontmatter.template === 'page') {
            createPage({
                path: slug,
                component: path.resolve('./src/templates/page-template.js'),
                context: {
                    slug,
                    layout: 'page'
                }
            });
        } 
        else if (edge.node.frontmatter.template === 'author') {
            const aboutAuthorSlug = `/${kebabCase(edge.node.frontmatter.title)}/${strings.about.toLowerCase()}/`;

            createPage({
                path: aboutAuthorSlug,
                component: path.resolve('./src/templates/meta/author-template.js'),
                context: {
                    slug: aboutAuthorSlug,
                    author: edge.node.frontmatter.title,
                    layout: 'page'
                }
            });
        } else {
            createPage({
                path: slug,
                component: path.resolve('./src/templates/post-template.js'),
                context: {
                    slug: slug,
                    layout: 'post',
                }
            });

            fs.writeFileSync(`public${slug.slice(0, -1)}.json`, JSON.stringify(edge));
        }
    };

    await createAllPage(graphql, actions);
    await createAgePages(graphql, actions);
    await createNewPage(graphql, actions);
    await createStartIndexLengthPages(graphql, actions);
    await createStartIndexPages(graphql, actions);
    await createStartCategoriesLengthPages(graphql, actions);
    await createStartCategoriesPages(graphql, actions);
    await createStartAuthorsLengthPages(graphql, actions)
    await createStartAuthorsPages(graphql, actions);
    await createNarratorPages(graphql, actions);
};

module.exports = createPages;
