import React from 'react';
import { graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import StartCarousels from '../../components/Start/StartCarousels'

const AuthorTemplate = ({ data, pageContext }) => {
    const { author } = pageContext

    const kebabAuthor = kebabCase(author);

    return (
        <StartCarousels data={data} prefix={`/${kebabAuthor}`} />
    );
};

export const query = graphql`
    query AuthorTemplate($author: String) {
        mostReadStories: allMarkdownRemark(sort: {fields: fields___viewsLastMonth, order: DESC}, filter: { frontmatter: { author: { eq: $author } }, fields: {viewsLastMonth: {ne: null}} }, limit: 1){
            ...Edges
        }
        shortStories: allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { eq: $author } }, timeToRead: { gte: 0, lte: 2 } }, limit: 1){
            ...Edges
        }
        mediumStories: allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { eq: $author } }, timeToRead: { gte: 3, lte: 6 } }, limit: 1){
            ...Edges
        }
        longStories: allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { eq: $author } }, timeToRead: { gte: 7, lte: 19 } }, limit: 1){
            ...Edges
        }
    }
`;

export default AuthorTemplate