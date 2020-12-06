import React from 'react';
import Page from '../components/Page';
import { strings } from '../utils/localization';
import Contact from '../components/Contact'
import LinkTitle from '../components/LinkTitle'

const FeedbackTemplate = () => {
    return (
        <Page pageTitle={strings.sendFeedback} description={strings.indexDescription}>
            <LinkTitle headerComponent='h1' title={strings.sendFeedback} />
            <Contact />
        </Page>
    );
};

export default FeedbackTemplate;