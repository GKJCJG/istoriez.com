import React from 'react';
import styles from './Carousel.module.scss';
import { withPrefix } from 'gatsby';
import FontIcon from '../FontIcons/FontIcon'
import { useInView } from 'react-intersection-observer'
import InfoStory from '../Story/InfoStory'

const Carousel = ({ children, jsonSlug, extra, rightScrollMargin = 50, className }) => {
    const [leftScroll, setLeftScroll] = React.useState(0);
    const [rightScroll, setRightScroll] = React.useState(-1);
    const [sentinelMargin, setSentinelMargin] = React.useState(300);
    const [renderedSlugs, setRenderedSlugs] = React.useState([]);
    const [remainingSlugs, setRemainingSlugs] = React.useState([])

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

        if (sentinel.current.getBoundingClientRect().right - window.innerWidth < sentinelMargin && inViewport && remainingSlugs.length > 0) {
            setRenderedSlugs([...renderedSlugs, remainingSlugs[0]])
            const temp = remainingSlugs;
            temp.shift()
            setRemainingSlugs(temp)
        }

        if (carousel.current === undefined) {
            return;
        }

        if (sentinel.current.getBoundingClientRect().right > carousel.current.clientWidth + rightScrollMargin) {
            setRightScroll(0)
        } else {
            setRightScroll(-1)
        }
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

    if (jsonSlug) {
        React.useEffect(() => {
            fetch(withPrefix(`${jsonSlug.slice(0, -1)}.json`))
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    setRemainingSlugs(json);
                });
        }, []);
    }

    return (
        <div className={`${styles.carouselcontainer} ${className || ''}`}>
            <div ref={carousel} className={styles.carousel} onScroll={() => handleScroll()}>
                {renderedSlugs && renderedSlugs.map(slug => <InfoStory key={withPrefix(slug)} className={styles.story} path={withPrefix(slug)} extra={extra} />)}
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

export default Carousel

