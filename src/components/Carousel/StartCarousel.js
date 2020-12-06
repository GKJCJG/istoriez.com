import React from 'react';
import styles from './Carousel.module.scss';
import { withPrefix } from 'gatsby';
import FontIcon from '../FontIcons/FontIcon'
import { useInView } from 'react-intersection-observer'
import InfoStory from '../Story/InfoStory'

const StartCarousel = ({ children, jsonSlug, extra, rightScrollMargin = 50, className, carouselContext }) => {
    const [leftScroll, setLeftScroll] = React.useState(0);
    const [rightScroll, setRightScroll] = React.useState(-1);
    const [sentinelMargin, setSentinelMargin] = React.useState(300);
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        if (sentinel && sentinel.current && sentinel.current.getBoundingClientRect().right > carousel.current.clientWidth) {
            setRightScroll(0)
        }
    }, []);

    const [ref, inView] = useInView({
        threshold: 0.1,
        root: null,
    })
    const sentinel = React.useRef();
    const carousel = React.useRef();

    const [inViewport, setInViewport] = React.useState(inView)

    React.useEffect(() => {
        if (inView) {
            setInViewport(true)
        }
    }, [inView])

    const handleScroll = () => {
        if (sentinel.current === undefined) {
            return;
        }

        if (sentinel.current.getBoundingClientRect().right - window.innerWidth < sentinelMargin && inViewport && carouselContext.remainingSlugs.length > 0) {
            carouselContext.setRenderedSlugs([...carouselContext.renderedSlugs, carouselContext.remainingSlugs[0]])
            const temp = carouselContext.remainingSlugs;
            temp.shift()
            carouselContext.setRemainingSlugs(temp)
        }

        if (carousel.current === undefined) {
            return;
        }

        if (sentinel.current.getBoundingClientRect().right > carousel.current.clientWidth + rightScrollMargin) {
            setRightScroll(0)
        } else {
            setRightScroll(-1)
        }

        carouselContext.setScrollPosition(carousel.current.scrollLeft);
    }

    const scrollLeft = () => {
        if (carousel.current === undefined) {
            return;
        }

        carousel.current.scrollLeft -= (carousel.current.clientWidth - 100);

        setRightScroll(1)

        setLeftScroll(carousel.current.scrollLeft - carousel.current.clientWidth + 100)
    }

    const scrollRight = () => {
        if (carousel.current === undefined) {
            return;
        }

        carousel.current.scrollLeft += (carousel.current.clientWidth - 100);

        setLeftScroll(carousel.current.scrollLeft + carousel.current.clientWidth)
    }

    React.useEffect(() => handleScroll())

    React.useEffect(() => {
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    });

    React.useEffect(() => {
        if (carouselContext.jsonSlug !== jsonSlug) {
            carouselContext.setRemainingSlugs([]);
            carouselContext.setRenderedSlugs([]);
            carouselContext.setJsonSlug(null)
            carouselContext.setScrollPosition(0)

            fetch(withPrefix(`${jsonSlug.slice(0, -1)}.json`))
                .then((response) => {
                    return response.json();
                })
                .then((slugs) => {
                    carouselContext.setJsonSlug(jsonSlug)
                    
                    carouselContext.setRemainingSlugs(slugs);
                });
        } else {
            if (carousel.current === undefined) {
                return;
            }
        
            // TODO: Fix big screen scroll buttons popping up as they should
            carousel.current.style['scroll-behavior'] = 'unset'
            carousel.current.scrollLeft = carouselContext.scrollPosition
            carousel.current.style['scroll-behavior'] = 'smooth'
        }

        setMounted(true)
    }, [jsonSlug]);

    return (
        <div className={`${styles.carouselcontainer} ${className || ''}`} style={mounted ? {} : {visibility: "hidden"}}>
            <div ref={carousel} className={styles.carousel} onScroll={() => handleScroll()}>
                {carouselContext.renderedSlugs && carouselContext.renderedSlugs.map(slug => <InfoStory key={withPrefix(slug)} className={styles.story} path={withPrefix(slug)} extra={extra} />)}
                {children}
                <span className={`${styles.scrollleft} ${leftScroll <= 0 ? styles.invisible : ''}`} onClick={() => scrollLeft()}>
                    <FontIcon>&#xe5cb;</FontIcon>
                </span>
                <span className={`${styles.scrollright} ${rightScroll < 0 ? styles.invisible : ''}`} onClick={() => scrollRight()} onMouseOver={() => setSentinelMargin(window.innerWidth)}>
                    <FontIcon>&#xe5cc;</FontIcon>
                </span>
                <div style={{ minWidth: "10px" }} ref={sentinel} >
                    <div style={{ minWidth: "10px", height: "100%" }} ref={ref}>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default StartCarousel

