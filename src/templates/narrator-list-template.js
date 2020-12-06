import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import ChipCarousel from '../components/ChipCarousel/ChipCarousel';
import LinkTitle from '../components/LinkTitle'
import { strings, slugs } from '../utils/localization';

const NarratorListTemplate = ({ data }) => {
    const { group } = data.allMarkdownRemark;

    return (
        <Page pageTitle={strings.allNarrators} description={strings.subtitle}>
            <LinkTitle headerComponent='h1' title={strings.allNarrators} />
            <ChipCarousel suffix={slugs.all} group={group} />
        </Page>
    );
};

export const query = graphql`
    query NarratorListQuery {
        allMarkdownRemark(filter: { fields: { narrator: { ne: null } } }) {
            group(field: fields___narrator) {
                fieldValue
            }
        }
    }
`;

export default NarratorListTemplate;
