import React from 'react';
import { graphql } from 'gatsby';
import ImagesFeed from '../components/Feed/ImagesFeed';
import Page from '../components/Page';

const ImagesTemplate = ({ data }) => {
    const { edges } = data.allMarkdownRemark;
   
    return (
        <Page pageTitle='Images' style={{background: "transparent"}}>
            <ImagesFeed title='Images' edges={edges} />
        </Page>
    );
};

export const query = graphql`
query ImagesPage {
    allMarkdownRemark(filter: { frontmatter: { author: { ne: null } } }) {
        ...ImagesEdges
    }
}
`;


export const imagesEdgesFragment = graphql`
    fragment ImagesEdges on MarkdownRemarkConnection {
        edges {
            node {
                fields {
                    slug                  
                    image {
                        childImageSharp {
                            fixed(width: 118, height: 158) {
                                srcSet
                            }
                        }
                    }
                }
                frontmatter {
                    title
                    author
                    style
                    font
                    lineheight
                }
            }
        }
    }
`

export default ImagesTemplate;
