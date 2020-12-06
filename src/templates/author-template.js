import React from 'react';
import { withPrefix, graphql } from 'gatsby';
import Feed from '../components/Feed';
import LinkTitle from '../components/LinkTitle'
import kebabCase from 'lodash/kebabCase';
import Page from '../components/Page';
import { slugs, strings } from '../utils/localization';
import styles from './author-template.module.scss';

const AuthorTemplate = ({ data, pageContext }) => {
    const { author, slug, chips } = pageContext;
    
    const slugsHref = `${slug.slice(0, -1)}.json`

    const title = `${strings.stories} ${strings.by} ${author}`;

    return (
        <Page pageTitle={title} description={strings.subtitle}>
            <Feed title={title} slugsHref={withPrefix(slugsHref)} chips={chips}>
            <LinkTitle href={`/${kebabCase(author)}/${strings.about}/`} title={author} />
            <div className={styles.description}
                    dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}>
                </div>
            </Feed>
        </Page>
    );
};

export const query = graphql`
    query MetaAuthorTemplate($author: String!) {
        markdownRemark(frontmatter: { title: { eq: $author } }) {
            id
            html
            frontmatter {
                title
            }
        }
    }
`;

export default AuthorTemplate;
