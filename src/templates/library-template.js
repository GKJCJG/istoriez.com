import React from 'react';
import Page from '../components/Page';
import Carousel from '../components/Carousel';
import { strings } from '../utils/localization';
import LinkTitle from '../components/LinkTitle'
import { getFavorites } from '../components/utils/favoriteManager';
import { getRecentlyReads } from '../components/utils/recentlyReadManager';
import { latestReadsTimeAgo } from '../utils/time';
import InfoStory from '../components/Story/InfoStory'
import styles from './library-template.module.scss'
import { Helmet } from 'react-helmet';

const EmptyMessage = ({ mounted, children }) => {
    return (
        <div className={styles.emptycontainer}>
            <span className={styles.message}>{mounted && children}</span>
        </div>
    );
}

const LibraryTemplate = () => {
    const [recentlyReads, setRecentlyReads] = React.useState([])
    const [favoritesPaths, setFavoritesPaths] = React.useState([])
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setFavoritesPaths(getFavorites());
        setRecentlyReads(getRecentlyReads());
        setMounted(true)
    }, []);

    return (
        <Page pageTitle={strings.yourLibrary} description={strings.indexDescription} fullWidth={false}>
            <Helmet>
                <link rel="alternate" hreflang="sv" href="https://www.istoriez.com/sv/ditt-bibliotek/" />
                <link rel="alternate" hreflang="x-default" href="https://www.istoriez.com/your-library/" />
            </Helmet>
            <LinkTitle title={strings.yourFavorites} />
            <Carousel className={styles.minheight}>
                {favoritesPaths.length === 0 ?
                    <EmptyMessage mounted={mounted}>{strings.noFavorites}</EmptyMessage> :
                    favoritesPaths.map(path => <InfoStory key={path} className={styles.story} path={path} />)}
            </Carousel>
            <LinkTitle title={strings.recentlyRead} />
            <Carousel>
                {recentlyReads.length === 0 ?
                    <EmptyMessage mounted={mounted}>{strings.noReads}</EmptyMessage> :
                    recentlyReads.map(recent => <InfoStory key={recent.path} path={recent.path} className={styles.story}>{latestReadsTimeAgo(recent.date)}</InfoStory>)}
            </Carousel>
        </Page>
    );
};

export default LibraryTemplate;
