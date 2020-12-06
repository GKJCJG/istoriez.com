import config from "../../../config";
import styles from './Page.module.scss';
import { Helmet } from 'react-helmet';
import React from 'react';
import { strings } from '../../utils/localization';

const Page = ({ children, pageTitle, description, fullWidth, style, className, removeSuffix }) => {
    const title = removeSuffix ? pageTitle : `${pageTitle} - ${strings.title}`
    
    return (
        <div>
            <Helmet>
                <html lang={strings.htmlLang} />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={config.url} />
                <meta property="og:image" content={`${config.url}/icons/icon-512x512.png`} />
            </Helmet>
            <div style={style} className={`${className} ${styles.page} ${!fullWidth ? styles.limitedwidth : ''}`}>
                {children}
            </div>
        </div>
    )
};

export default Page;
