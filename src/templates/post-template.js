import React from 'react';
import { graphql } from 'gatsby';
import Post from '../components/Post';
import { strings } from '../utils/localization';

const PostTemplate = ({ data, location }) => {
    const { title, author  } = data.markdownRemark.frontmatter;

    return (
        <Post
            pageTitle={`${title} - ${strings.bedtimeStory} - ${author} - ${strings.title}`}
            post={data.markdownRemark}
            location={location} />
    );
};

export const query = graphql`
    query PostBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            fields {
                slug
                authorSlug
                stars
                starVotes
                narrator
                cover {
                    childImageSharp {
                        fixed(width: 150) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
                serpcover {
                    childImageSharp {
                        fixed(width: 200) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
                audio {
                    publicURL
                }
            }
            frontmatter {
                title
                author
            }
            excerpt
            timeToRead
        }
    }
`;

export default PostTemplate
