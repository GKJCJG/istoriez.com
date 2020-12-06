import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import LinkTitle from '../components/LinkTitle'
import { strings } from '../utils/localization';
import AudioStoriesFeed from '../components/Feed/AudioStoriesFeed';
import { Helmet } from 'react-helmet';

const AudioStoriesTemplate = ({ data }) => {
    const { edges } = data.allMarkdownRemark;

    return (
        <Page pageTitle={strings.audioStories} description={strings.subtitle}>
            <Helmet>
                <link rel="alternate" hreflang="sv" href="https://www.istoriez.com/sv/ljudsagor/" />
                <link rel="alternate" hreflang="x-default" href="https://www.istoriez.com/audio-stories/" />
            </Helmet>
            <LinkTitle headerComponent="h1" title={strings.audioStories} />
            <AudioStoriesFeed title={strings.audioStories} edges={edges} />
        </Page>
    );
};

export const query = graphql`
    query AudioStoriesTemplate {
        allMarkdownRemark(filter: { fields: { narrator: { ne: null } } }) {
            edges {
                node {
                    fields {
                        slug
                        viewsLastMonth
                        stars
                        starVotes
                        narrator
                        authorSlug
                        cover {
                            childImageSharp {
                                fixed(width: 150) {
                                    src
                                    srcSet
                                }
                            }
                        }
                        audio {
                            publicURL
                        }
                    }
                    frontmatter {
                        tags
                        title
                        author
                        age
                    }
                    excerpt
                    timeToRead
                }
            }
            
        }
    }
`;

export default AudioStoriesTemplate;
