import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import ChipCarousel from '../components/ChipCarousel/ChipCarousel';
import LinkTitle from '../components/LinkTitle'
import { strings, slugs } from '../utils/localization';

const AuthorListTemplate = ({ data }) => {
    const { group } = data.allMarkdownRemark;

    return (
        <Page pageTitle={strings.allAuthors} description={strings.subtitle}>
            <LinkTitle headerComponent="h1" title={strings.allAuthors}/>
            <ChipCarousel suffix={slugs.all} group={group} />
        </Page>
    );
};

export const query = graphql`
    query AuthorListQuery {
        allMarkdownRemark(filter: { frontmatter: { author: { ne: null } } }) {
            group(field: frontmatter___author) {
                fieldValue
            }
        }
    }
`;

export default AuthorListTemplate;
