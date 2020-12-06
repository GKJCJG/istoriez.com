import React from 'react';
import Page from '../components/Page';
import { strings } from '../utils/localization';

const NotFoundTemplate = () => {
    return (
        <Page pageTitle="404" description={strings.subtitle}>
            <p style={{ padding: "20px" }}>{strings.fourOfour}</p>
        </Page>
    );
};

export default NotFoundTemplate;
