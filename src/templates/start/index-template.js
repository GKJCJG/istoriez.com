import React from 'react';
import { graphql } from 'gatsby';
import StartCarousels from '../../components/Start/StartCarousels'
import { Helmet } from 'react-helmet';
import config from "../../../config";

const IndexTemplate = ({ data, pageContext }) => {
    const { prefix } = pageContext;

    return (
        <>
            <Helmet>
                <link rel="alternate" hreflang="sv" href="https://www.istoriez.com/sv/" />
                <link rel="alternate" hreflang="x-default" href="https://www.istoriez.com/" />
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org",
                        "@graph": [
                            ${process.env.GATSBY_SITE_LANG ?
                                `{
                                    "@type": "Organization",
                                    "@id": "https://www.istoriez.com/#organization",
                                    "name": "iStoriez",
                                    "url": "https://www.istoriez.com/",
                                    "logo": "https://www.istoriez.com/icons/icon-512x512.png",
                                    "sameAs": [
                                        "https://www.facebook.com/iStoriez",
                                        "https://www.facebook.com/iStoriezSverige"
                                    ]
                                },` :
                                ''
                            }
                            {
                                "@type": "WebSite",
                                "@id": "${config.url}/#website",
                                "url": "${config.url}/",
                                "inLanguage": "${process.env.GATSBY_SITE_LANG ? 'en' : 'sv'}",
                                "publisher": {"@id": "https://www.istoriez.com/#organization"}
                              }
                        ]
                    }
                `}</script>
            </Helmet>
            <StartCarousels data={data} prefix={prefix} />
        </>
    );
};

export const query = graphql`
    query IndexTemplate {
        mostReadStories: allMarkdownRemark(sort: {fields: fields___viewsLastMonth, order: DESC}, filter: { frontmatter: { author: { ne: null } }, fields: {viewsLastMonth: {ne: null}} }, limit: 1){
            ...Edges
        }
        shortStories: allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null } }, timeToRead: { gte: 0, lte: 2 } }, limit: 1){
            ...Edges
        }
        mediumStories: allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null } }, timeToRead: { gte: 3, lte: 6 } }, limit: 1){
            ...Edges
        }
        longStories: allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null } }, timeToRead: { gte: 7, lte: 19 } }, limit: 1){
            ...Edges
        }
    }
`;

export const fragment = graphql`
    fragment Edges on MarkdownRemarkConnection {
        edges {
            node {
                frontmatter {
                    title
                }
            }
        }
    }
`

export default IndexTemplate
