import React from 'react';
import './src/assets/scss/init.scss';
import 'cookieconsent/build/cookieconsent.min.css';
import { withPrefix } from "gatsby"
import AudioProvider from './src/components/Audio/audio-context'
import AgeTabProvider from './src/components/Nav/agetab-context'
import FeedProvider from './src/components/Feed/feed-context'
import StoryProvider from './src/components/Story/story-context'
import StoryLoadedProvider from './src/components/Story/storyloaded-context'
import ShortStoriesProvider from './src/components/Start/Contexts/shortstories-context'
import MediumStoriesProvider from './src/components/Start/Contexts/mediumstories-context'
import LongStoriesProvider from './src/components/Start/Contexts/longstories-context'
import MostReadStoriesProvider from './src/components/Start/Contexts/mostreadstories-context'
import LatestStoriesProvider from './src/components/FavoriteCarousel/lateststories-context'

export const shouldUpdateScroll = ({ routerProps, prevRouterProps }) => {
    const fromAgeTabToAgeTab =
        routerProps &&
        routerProps.location &&
        routerProps.location.state &&
        routerProps.location.state.agetab &&
        prevRouterProps &&
        prevRouterProps.location &&
        prevRouterProps.location.state &&
        prevRouterProps.location.state.agetab

    if (fromAgeTabToAgeTab) {
        return false;
    }

    const fromIndexToAgeTab =
        routerProps &&
        routerProps.location &&
        routerProps.location.state &&
        routerProps.location.state.agetab &&
        prevRouterProps &&
        prevRouterProps.location &&
        prevRouterProps.location.pathname === withPrefix('/')

    if (fromIndexToAgeTab) {
        return false;
    }

    if (typeof window !== 'undefined' && window.innerWidth > 945) {
        return true;
    }

    const fromOtherToAgeTab =
        routerProps &&
        routerProps.location &&
        routerProps.location.state &&
        routerProps.location.state.agetab

    if (fromOtherToAgeTab) {
        const currentPosition = window.sessionStorage.getItem('startScroll')

        window.scrollTo(...([0, currentPosition] || [0, 0]))

        return false;
    }

    return true;
}

export const wrapRootElement = ({ element }) => {
    return (
        <FeedProvider>
            <StoryProvider>
                <StoryLoadedProvider>
                    <AgeTabProvider>
                        <AudioProvider>
                            <LatestStoriesProvider>
                                <ShortStoriesProvider>
                                    <MediumStoriesProvider>
                                        <LongStoriesProvider>
                                            <MostReadStoriesProvider>
                                                {element}
                                            </MostReadStoriesProvider>
                                        </LongStoriesProvider>
                                    </MediumStoriesProvider>
                                </ShortStoriesProvider>
                            </LatestStoriesProvider>
                        </AudioProvider>
                    </AgeTabProvider>
                </StoryLoadedProvider>
            </StoryProvider>
        </FeedProvider>
    )
}
