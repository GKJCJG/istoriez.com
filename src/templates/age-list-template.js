import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import ChipCarousel from '../components/ChipCarousel/ChipCarousel';
import LinkTitle from '../components/LinkTitle'
import { strings, slugs } from '../utils/localization';

const AgeListTemplate = ({ data }) => {
    const { group } = data.allMarkdownRemark;

    return (
        <Page pageTitle={strings.allAges} description={strings.subtitle}>
            <LinkTitle headerComponent="h1" title={strings.allAges}/>
            <ChipCarousel suffix={slugs.all} group={group} />
        </Page>
    );
};

export const query = graphql`
    query AgeListQuery {
        allMarkdownRemark(filter: { frontmatter: { author: { ne: null } } }) {
            group(field: frontmatter___age) {
                fieldValue
            }
        }
    }
`;

export default AgeListTemplate;
