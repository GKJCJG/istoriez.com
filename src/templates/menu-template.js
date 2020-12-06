import React from 'react';
import Page from '../components/Page';
import Menu from '../components/Menu/Menu';
import { strings } from '../utils/localization';
import { Helmet } from 'react-helmet';

const MenuTemplate = () => {
    return (
        <Page pageTitle={strings.menu} description={strings.indexDescription}>
            <Helmet>
                <link rel="alternate" hreflang="sv" href="https://www.istoriez.com/sv/meny/" />
                <link rel="alternate" hreflang="x-default" href="https://www.istoriez.com/menu/" />
            </Helmet>
            <Menu />
        </Page>
    );
};

export default MenuTemplate;