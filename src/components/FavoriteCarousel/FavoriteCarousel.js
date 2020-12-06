import React from 'react';
import styles from './FavoriteCarousel.module.scss';
import GatsbyEdgeCoverStory from '../Story/GatsbyEdgeCoverStory'
import FontIcon from '../FontIcons/FontIcon'
import { newStoriesTimeAgo } from '../../utils/time'
import { useInView } from 'react-intersection-observer'
import { LatestStoriesContext } from './lateststories-context'

const THRESHOLD = 0.999;
const rightScrollMargin = 50;

// TODO: Fix so that big screen scroll buttons appear after navigating back (store scrollLeft in context?)

const ZoomSnapStory = ({ edge, index, hasClicked }) => {
    const [ref, inView] = useInView({
        threshold: THRESHOLD,
        root: typeof window !== 'undefined' ? document.getElementById("___gatsby") : null,
    })

    const latestStoriesContext = React.useContext(LatestStoriesContext)

    React.useEffect(() => {
        if (hasClicked) {
            const storiesInView = latestStoriesContext.inView;
            storiesInView[index] = inView;
            latestStoriesContext.setInView(storiesInView);
        }
    })

    return (
        <div className={styles.storycontainer}>
            <GatsbyEdgeCoverStory
                edge={edge}
                className={`${styles.snap} ${latestStoriesContext.inView[index] ? styles.intersecting : styles.notintersecting}`}
            />
            <div ref={ref} className={styles.observable}></div>
            <div className={styles.timestamp}>
                {newStoriesTimeAgo(new Date(edge.node.fields.modified))}
            </div>
        </div>
    )
}

const Space = () => (
    <div style={{ minWidth: "40vw", height: "20px" }}></div>
)

const Carousel = ({ edges }) => {
    const [hasClicked, setHasClicked] = React.useState(false);

    const latestStoriesContext = React.useContext(LatestStoriesContext)

    React.useEffect(() => {
        if (sentinel && sentinel.current && sentinel.current.getBoundingClientRect().right > carousel.current.clientWidth) {
            setRightScroll(0)
        }

        if (!carousel || carousel.current === undefined) {
            return
        }

        carousel.current.style['scroll-behavior'] = 'unset'
        carousel.current.scrollLeft = latestStoriesContext.scrollPosition
        carousel.current.style['scroll-behavior'] = 'smooth'
    }, []);

    const sentinel = React.useRef();
    const carousel = React.useRef();

    const [leftScroll, setLeftScroll] = React.useState(0);
    const [rightScroll, setRightScroll] = React.useState(-1);

    React.useEffect(() => handleScroll())

    React.useEffect(() => {
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    });

    const handleScroll = () => {
        if (sentinel.current === undefined || carousel.current === undefined) {
            return;
        }

        if (sentinel.current.getBoundingClientRect().right > carousel.current.clientWidth + rightScrollMargin) {
            setRightScroll(0)
        } else {
            setRightScroll(-1)
        }

        latestStoriesContext.setScrollPosition(carousel.current.scrollLeft);
    }

    const scrollLeft = () => {
        if (carousel.current === undefined) {
            return;
        }

        setHasClicked(true)
        carousel.current.scrollLeft -= 259;

        setRightScroll(1)
        setLeftScroll(carousel.current.scrollLeft - 259)
    }

    const scrollRight = () => {
        if (carousel.current === undefined) {
            return;
        }

        setHasClicked(true)
        carousel.current.scrollLeft += 259;

        setLeftScroll(carousel.current.scrollLeft + 259)
    }

    return (
        <div className={styles.carouselcontainer}>
            <div ref={carousel} className={styles.favoritecarousel} onScroll={() => handleScroll()} onTouchStart={() => setHasClicked(true)}>
                {edges && edges.map((edge, index) => (
                    <ZoomSnapStory key={edge.node.fields.slug} edge={edge} index={index} hasClicked={hasClicked} />
                ))}
                <span className={`${styles.scrollleft} ${leftScroll <= 0 ? styles.invisible : ''}`} onClick={() => scrollLeft()}>
                    <FontIcon>&#xe5cb;</FontIcon>
                </span>
                <span className={`${styles.scrollright} ${rightScroll < 0 ? styles.invisible : ''}`} onClick={() => scrollRight()} >
                    <FontIcon>&#xe5cc;</FontIcon>
                </span>
                <Space />
                <div style={{ minWidth: "10px" }} ref={sentinel} />
            </div>
        </div>
    );
}

export default Carousel

