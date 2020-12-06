'use strict';

const siteConfig = require('./config.js');
const autoprefixer = require('autoprefixer');
const strings = require('./src/utils/localization')

const plugins = [
    {
        resolve: `gatsby-transformer-remark`,
        options: {
            plugins: [
                'gatsby-remark-autolink-headers'
            ]
        }
    },
    {
        resolve: `gatsby-plugin-layout`,
        options: {
            component: require.resolve(`./src/components/Layout`),
        },
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            path: `${__dirname}/content/${process.env.GATSBY_SITE_LANG ? process.env.GATSBY_SITE_LANG : 'sv'}`,
            name: 'pages',
            ignore: ['**/drafts']
        }
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            path: `${__dirname}/static/media`,
            name: 'media'
        }
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            path: `${__dirname}/content/images`,
            name: 'media'
        }
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            name: 'assets',
            path: `${__dirname}/static`
        }
    },
    'gatsby-source-categories',
    'gatsby-source-authors',
    {
        resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
        options: {
            // Fields to index
            fields: [`title`, `author`, `slug`, 'type'],
            // How to resolve each field`s value for a supported node type
            resolvers: {
                // For any node of type MarkdownRemark, list how to resolve the fields` values
                MarkdownRemark: {
                    title: node => node.frontmatter.title,
                    author: node => node.frontmatter.author,
                    slug: node => node.fields.slug,
                    type: node => 'Story'
                },
                Category: {
                    title: node => node.name,
                    author: node => 'yada',
                    slug: node => node.slug,
                    type: node => 'Category'
                },
                Author: {
                    title: node => node.name,
                    author: node => 'yada',
                    slug: node => node.slug,
                    type: node => 'Author'
                },
            },
            // Optional filter to limit indexed nodes
            filter: (node, getNode) =>
                node.internal.type === 'Category' || node.internal.type === 'Author' || node.frontmatter && node.frontmatter.template !== 'page' && node.frontmatter.template !== 'author',
        },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-netlify',
    {
        resolve: 'gatsby-plugin-google-gtag',
        options: {
            trackingIds: [process.env.TRACKING_ID]
        },
    },
    {
        resolve: 'gatsby-plugin-sitemap',
        options: {
            query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage(
              filter: {
                path: { regex: "/^(?!/404/|/404.html|/dev-404-page/|/cookies/|/pages/|/images/)/" }
              }
            ) {
              edges {
                node {
                  path
                }
              }
            }
          }
        `,
            output: '/sitemap.xml',
            serialize: ({ site, allSitePage }) => allSitePage.edges.map((edge) => ({
                url: `https://www.istoriez.com${edge.node.path}`,
                changefreq: 'daily',
                priority: 0.7
            }))
        }
    },
    {
        resolve: 'gatsby-plugin-manifest',
        options: {
            name: strings.title,
            short_name: strings.title,
            start_url: '/',
            background_color: '#FFF',
            theme_color: '#FFF',
            display: 'standalone',
            icon: 'static/media/istoriez.png'
        },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
        resolve: 'gatsby-plugin-sass',
        options: {
            postCssPlugins: [autoprefixer()],
            cssLoaderOptions: {
                camelCase: false,
            }
        }
    },
    {
        resolve: 'gatsby-plugin-react-svg',
        options: {
            rule: {
                include: /\.inline\.svg$/
            }
        }
    },
];

module.exports = {
    pathPrefix: process.env.GATSBY_PATH_PREFIX,
    siteMetadata: {
        url: siteConfig.url,
        siteUrl: siteConfig.url,
    },
    plugins
};
