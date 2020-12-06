import React from 'react';
import { graphql } from 'gatsby';
import StartCarousels from '../../components/Start/StartCarousels'

const AgeTemplate = ({ data, pageContext }) => {
    const { prefix } = pageContext
   
    return (
        <StartCarousels data={data} prefix={prefix} />
    );
};

export const query = graphql`
    query AgeTemplate($age: String) {
        mostReadStories: allMarkdownRemark(sort: {fields: fields___viewsLastMonth, order: DESC}, filter: { frontmatter: { author: { ne: null }, age: { eq: $age } }, fields: {viewsLastMonth: {ne: null}} }, limit: 1){
            ...Edges
        }
        shortStories: allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null }, age: { eq: $age } }, timeToRead: { gte: 0, lte: 2 } }, limit: 1){
            ...Edges
        }
        mediumStories: allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null }, age: { eq: $age } }, timeToRead: { gte: 3, lte: 6 } }, limit: 1){
            ...Edges
        }
        longStories: allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null }, age: { eq: $age } }, timeToRead: { gte: 7, lte: 19 } }, limit: 1){
            ...Edges
        }
    }
`;

export default AgeTemplate