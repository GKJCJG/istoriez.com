import React from 'react';
import { graphql } from 'gatsby';
import StartCarousels from '../../components/Start/StartCarousels'

const CategoryTemplate = ({ data, pageContext }) => {
    const { prefix } = pageContext

    return (
        <StartCarousels data={data} prefix={prefix} />
    );
};

export const query = graphql`
    query CategoryTemplate($tag: String) {
        mostReadStories: allMarkdownRemark(sort: {fields: fields___viewsLastMonth, order: DESC}, filter: { frontmatter: { author: { ne: null }, tags: { in: [$tag] } }, fields: {viewsLastMonth: {ne: null}} }, limit: 1){
            ...Edges
        }
        shortStories: allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null }, tags: { in: [$tag] } }, timeToRead: { gte: 0, lte: 2 } }, limit: 1){
            ...Edges
        }
        mediumStories: allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null }, tags: { in: [$tag] } }, timeToRead: { gte: 3, lte: 6 } }, limit: 1){
            ...Edges
        }
        longStories: allMarkdownRemark(sort: {fields: fields___stars, order: DESC}, filter: { frontmatter: { author: { ne: null }, tags: { in: [$tag] } }, timeToRead: { gte: 7, lte: 19 } }, limit: 1){
            ...Edges
        }
    }
`;

export default CategoryTemplate