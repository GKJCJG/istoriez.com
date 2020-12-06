import React from 'react';
import { graphql } from 'gatsby';
import Page from '../../components/Page';
import LinkTitle from '../../components/LinkTitle'
import { strings } from '../../utils/localization'

const capitalize = (value) => {
    return value[0].toUpperCase() + value.substring(1)
}

const AboutAuthorTemplate = ({ data }) => {
    const { title: siteTitle, subtitle: siteSubtitle } = strings;

    const { markdownRemark } = data;

    const pageTitle = `${capitalize(strings.about)} ${markdownRemark.frontmatter.title}`;

    const { html } = markdownRemark;

    return (
        <Page pageTitle={`${pageTitle} - ${siteTitle}`} description={siteSubtitle}>
            <LinkTitle headerComponent="h1" title={pageTitle} />
            <div style={{ padding: "15px 20px 80px 18px" }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </Page>
    );
};

export const query = graphql`
    query AboutAuthorTemplate($author: String!) {
        markdownRemark(frontmatter: { title: { eq: $author } }) {
            id
            html
            frontmatter {
                title
            }
        }
    }
`;

export default AboutAuthorTemplate
