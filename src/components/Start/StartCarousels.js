import React from 'react';
import { Helmet } from 'react-helmet';
import StartCarousel from '../Carousel/StartCarousel';
import { strings, slugs } from '../../utils/localization';
import LinkTitle from '../LinkTitle';
import styles from './StartCarousels.module.scss'
import { ShortStoriesContext } from './Contexts/shortstories-context';
import { MediumStoriesContext } from './Contexts/mediumstories-context';
import { LongStoriesContext } from './Contexts/longstories-context';
import { MostReadStoriesContext } from './Contexts/mostreadstories-context';
import config from "../../../config";

const StartCarousels = ({ data, prefix }) => {
    const { edges: shortStories } = data.shortStories;
    const { edges: mediumStories } = data.mediumStories;
    const { edges: longStories } = data.longStories;
    const { edges: mostReadStories } = data.mostReadStories;

    const shortStoriesContext = React.useContext(ShortStoriesContext)
    const mediumStoriesContext = React.useContext(MediumStoriesContext)
    const longStoriesContext = React.useContext(LongStoriesContext)
    const mostReadStoriesContext = React.useContext(MostReadStoriesContext)

    if (!shortStories || shortStories.length == 0) {
        shortStoriesContext.setJsonSlug(null)
    }

    if (!mediumStories || mediumStories.length == 0) {
        mediumStoriesContext.setJsonSlug(null)
    }

    if (!longStories || longStories.length == 0) {
        longStoriesContext.setJsonSlug(null)
    }

    if (!mostReadStories || mostReadStories.length == 0) {
        mostReadStoriesContext.setJsonSlug(null)
    }

    return (
        <div>
            <Helmet>
                <title>{strings.indexTitle}</title>
                <meta property="og:title" content={strings.indexTitle} />
                <meta name="description" content={strings.indexDescription} />
                <meta property="og:description" content={strings.indexDescription} />
                <link rel="canonical" href={`${config.url}/`} />
            </Helmet>
            {shortStories && shortStories.length > 0 &&
                <>
                    <LinkTitle href={`${prefix}${slugs.shortStories}`} title={strings.shortStories} />
                    <StartCarousel className={styles.carousel} jsonSlug={`${prefix}${slugs.shortStories}`} carouselContext={shortStoriesContext} />
                </>
            }

            {mediumStories && mediumStories.length > 0 &&
                <>
                    <LinkTitle href={`${prefix}${slugs.mediumStories}`} title={strings.mediumStories} />
                    <StartCarousel className={styles.carousel} jsonSlug={`${prefix}${slugs.mediumStories}`} carouselContext={mediumStoriesContext} />
                </>
            }

            {longStories && longStories.length > 0 &&
                <>
                    <LinkTitle href={`${prefix}${slugs.longStories}`} title={strings.longStories} />
                    <StartCarousel className={styles.carousel} jsonSlug={`${prefix}${slugs.longStories}`} carouselContext={longStoriesContext} />
                </>
            }

            {mostReadStories && mostReadStories.length > 0 &&
                <>
                    <LinkTitle href={`${prefix}${slugs.mostReadStories}`} title={strings.mostReadStories} />
                    <StartCarousel className={styles.carousel} jsonSlug={`${prefix}${slugs.mostReadStories}`} extra="pageviews" carouselContext={mostReadStoriesContext} />
                </>
            }
        </div>
    );
}

export default StartCarousels;