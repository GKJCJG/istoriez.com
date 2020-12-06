import React from 'react';
import { graphql } from 'gatsby';
import Page from '../components/Page';
import LinkTitle from '../components/LinkTitle'
import { strings } from '../utils/localization'
import styles from './page-template.module.scss'

const PageTemplate = ({ data }) => {
    const { html, frontmatter } = data.markdownRemark;
    const { title, removeSuffix } = frontmatter;

    return (
        <Page pageTitle={title} description={strings.subtitle} className={styles.page} removeSuffix={removeSuffix}>
            <LinkTitle headerComponent="h1" title={title} />
            <div style={{ padding: "15px 20px 80px 18px" }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </Page>
    );
};

export const query = graphql`
    query PageBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            frontmatter {
                title
                removeSuffix
            }
        }
    }
`;

export default PageTemplate
