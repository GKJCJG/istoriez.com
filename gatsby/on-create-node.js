'use strict';

const kebabCase = require('lodash/kebabCase');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { slugs, strings } = require('../src/utils/localization');
const fs = require('fs')
const { google } = require('googleapis')
const execa = require('execa');

let analyticsDataSingleton = null;
let semaphore = false;

const analyticsDataFetch = async () => {
    const jwt = new google.auth.JWT(process.env.CLIENT_EMAIL, null, process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'), 'https://www.googleapis.com/auth/analytics.readonly')
    await jwt.authorize()

    const viewsLastMonth = await google.analytics('v3').data.ga.get({
        'auth': jwt,
        'ids': process.env.VIEW_ID,
        'start-date': `30daysAgo`,
        'end-date': 'today',
        'dimensions': 'ga:pagePath',
        'metrics': 'ga:pageviews',
        'sort': '-ga:pageviews',
    })

    const stars = await google.analytics('v3').data.ga.get({
        'auth': jwt,
        'ids': process.env.VIEW_ID,
        'start-date': `2020-04-01`,
        'end-date': 'today',
        'dimensions': 'ga:eventLabel',
        'metrics': 'ga:avgEventValue, ga:totalEvents',
        'filters': 'ga:eventCategory==Star',
    })

    return { viewsLastMonth: viewsLastMonth.data.rows, stars: stars.data.rows };
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getAnalyticsData = async () => {
    if (!analyticsDataSingleton && !semaphore) {
        semaphore = true;
        analyticsDataSingleton = await analyticsDataFetch();
    } else {
        while (!analyticsDataSingleton) {
            await sleep(200)
        }
    }

    return analyticsDataSingleton;
}

const onCreateNode = async ({ node, actions, getNode, pathPrefix }) => {
    const { createNodeField } = actions;

    fmImagesToRelative(node);

    if (node.internal.type === 'MarkdownRemark') {
        if (typeof node.frontmatter.slug !== 'undefined') {
            createNodeField({
                node,
                name: 'slug',
                value: node.frontmatter.slug
            });

        } else if (typeof node.frontmatter.title !== 'undefined') {
            const slug = `/${kebabCase(node.frontmatter.title)}/`;

            createNodeField({
                node,
                name: 'slug',
                value: slug
            });

            let viewsLastMonth = null
            let starsRow = null

            if (process.env.PRIVATE_KEY) {
                let analyticsData = await getAnalyticsData();
                viewsLastMonth = analyticsData.viewsLastMonth.find(row => row[0] === pathPrefix + slug)
                starsRow = analyticsData.stars.find(row => row[0] === pathPrefix + slug)
            }
            
            if (viewsLastMonth) {
                createNodeField({
                    node,
                    name: 'viewsLastMonth',
                    value: Number(viewsLastMonth[1])
                });
            }

            if (starsRow) {
                createNodeField({
                    node,
                    name: 'stars',
                    value: parseFloat(starsRow[1]).toFixed(1).replace('.', ',')
                });
                createNodeField({
                    node,
                    name: 'starVotes',
                    value: starsRow[2]
                });
            } else {
                createNodeField({
                    node,
                    name: 'stars',
                    value: '-'
                });
                createNodeField({
                    node,
                    name: 'starVotes',
                    value: strings.no
                });
            }

            const parentNode = getNode(node.parent)
            if (parentNode && parentNode.internal.type === `File`) {
                if (fs.existsSync(`./content/images/${parentNode.name}.png`)) {
                    createNodeField({
                        node,
                        name: `image`,
                        value: `../../images/${parentNode.name}.png`
                    });
                } else if (fs.existsSync(`./content/images/${parentNode.name}.jpg`)) {
                    createNodeField({
                        node,
                        name: `image`,
                        value: `../../images/${parentNode.name}.jpg`
                    });
                }

                if (fs.existsSync(`./content/${process.env.GATSBY_SITE_LANG ? process.env.GATSBY_SITE_LANG : 'sv'}/covers/${kebabCase(node.frontmatter.title)}.png`)) {
                    createNodeField({
                        node,
                        name: `cover`,
                        value: `../covers/${kebabCase(node.frontmatter.title)}.png`
                    });
                }

                if (fs.existsSync(`./content/${process.env.GATSBY_SITE_LANG ? process.env.GATSBY_SITE_LANG : 'sv'}/serp-covers/${kebabCase(node.frontmatter.title)}.png`)) {
                    createNodeField({
                        node,
                        name: `serpcover`,
                        value: `../serp-covers/${kebabCase(node.frontmatter.title)}.png`
                    });
                }
            }

            if (parentNode && parentNode.internal.type === `File`) {
                if (fs.existsSync(`./content/${process.env.GATSBY_SITE_LANG ? process.env.GATSBY_SITE_LANG : 'sv'}/audio/${kebabCase(node.frontmatter.title)}.mp3`)) {
                    createNodeField({
                        node,
                        name: `audio`,
                        value: `../audio/${kebabCase(node.frontmatter.title)}.mp3`
                    });

                    createNodeField({
                        node,
                        name: `narrator`,
                        value: typeof node.frontmatter.narrator !== 'undefined' ? node.frontmatter.narrator : strings.speechSynthesis
                    });
                }

                const { stdout } = await execa('git', ['log', '--diff-filter=A', '--follow', '-1', `--format=%ad`, '--', parentNode.absolutePath]);

                if (stdout) {
                    createNodeField({ node, name: 'modified', value: new Date(stdout).toISOString() });
                }
            }
        } else {
            const value = createFilePath({ node, getNode });
            createNodeField({
                node,
                name: 'slug',
                value
            });
        }

        if (node.frontmatter.tags) {
            const categorySlug = node.frontmatter.tags.map((tag) => `${slugs.categories}${kebabCase(tag)}/`);
            createNodeField({ node, name: 'tagSlugs', value: categorySlug });
        }

        if (node.frontmatter.author) {
            const authorSlug = `/${kebabCase(node.frontmatter.author)}${slugs.all}`;
            createNodeField({ node, name: 'authorSlug', value: authorSlug });
        }
    }
};

module.exports = onCreateNode;
