import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import { strings, slugs } from '../utils/localization';
import LinkTitle from '../components/LinkTitle'
import ChipCarousel from '../components/ChipCarousel/ChipCarousel'

const CategoryListTemplate = ({ data }) => {
    const { group } = data.allMarkdownRemark;

    return (
        <Page pageTitle={strings.allCategories} description={strings.subtitle}>
            <LinkTitle headerComponent='h1' title={strings.allCategories}/>
            <ChipCarousel suffix={slugs.all} group={group} />
        </Page>
    );
};

export const query = graphql`
    query CategoryListQuery {
        allMarkdownRemark(filter: { frontmatter: { author: { ne: null } } }) {
            group(field: frontmatter___tags) {
                fieldValue
            }
        }
    }
`;

export default CategoryListTemplate;