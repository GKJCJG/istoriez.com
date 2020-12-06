import React from 'react';
import { withPrefix } from 'gatsby';
import Feed from '../components/Feed';
import Page from '../components/Page';
import { strings } from '../utils/localization'

const FeedTemplate = ({ pageContext }) => {
    const { title, slug, extra, chips } = pageContext;

    const slugsHref = `${slug.slice(0, -1)}.json`

    return (
        <Page pageTitle={title} description={strings.subtitle}>
            <Feed title={title} slugsHref={withPrefix(slugsHref)} extra={extra} chips={chips}/>
        </Page>
    );
};

export default FeedTemplate;
