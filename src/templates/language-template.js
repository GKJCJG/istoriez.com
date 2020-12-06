import React from 'react';
import Page from '../components/Page';
import { strings } from '../utils/localization';
import Languages from '../components/Languages'
import LinkTitle from '../components/LinkTitle'

const LanguageTemplate = () => {
    return (
        <Page pageTitle={strings.languages} description={strings.indexDescription}>
            <LinkTitle headerComponent='h1' title={strings.languages} />
            <Languages />
        </Page>
    );
};

export default LanguageTemplate