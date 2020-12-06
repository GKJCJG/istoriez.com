import React from 'react';
import styles from './Layout.module.scss';
import './layout.scss';
import Nav from '../Nav';
import { Link, withPrefix } from "gatsby"
import { Link as ReachLink } from '@reach/router'
import { strings, slugs } from '../../utils/localization';
import { isDarkTheme, toggleDarkTheme } from '../../utils/theme'
import Start from '../Start'
import FontIcon from '../FontIcons/FontIcon'
import { AudioContext } from '../Audio/audio-context';
import { AgeTabContext } from '../Nav/agetab-context';
import Audio from '../Audio';
import Footer from '../Footer/Footer';

const BackButton = ({ location }) => {
    if (location.state && location.state.iStoriez) {
        return (
            <FontIcon className={styles.actionitem} onClick={() => window.history.back()}>&#xe5c4;</FontIcon>
        )
    }

    return (
        <Link to='/'>
            <FontIcon className={styles.actionitem}>&#xe5c4;</FontIcon>
        </Link>
    )
}

const Layout = ({ pageContext, children, location }) => {
    const { tag, author, ages, start, layout } = pageContext

    const post = layout === 'post';
    const main = layout === 'main';
    const search = layout === 'search';
    const page = layout === 'page';
    const none = layout === 'none';

    if (none) {
        return children;
    }

    const ageTabContext = React.useContext(AgeTabContext);

    React.useEffect(() => {
        if (start) {
            ageTabContext.setPathname(location.pathname)

            window.addEventListener('scroll', handleStartRouteScroll)

            return () => {
                window.removeEventListener('scroll', handleStartRouteScroll);
            }
        }
    }, [location])

    const [dark, setDark] = React.useState(isDarkTheme())
    const [mounted, setMounted] = React.useState(false);

    const { audio, show, cover } = React.useContext(AudioContext);

    const handleStartRouteScroll = () => {
        window.sessionStorage.setItem('startScroll', window.scrollY)
    }

    React.useEffect(() => {
        setMounted(true);

        window.addEventListener('resize', setMinHeight);

        return () => {
            window.removeEventListener('resize', setMinHeight);
        }
    }, [])

    React.useEffect(() => {
        setMinHeight();
    })

    const setMinHeight = () => {
        if (!post) {
            const smallScreen = window.innerWidth < 945;
            const audioPlaying = audio && show;

            let minHeight = 0;

            if (smallScreen && audioPlaying) {
                minHeight = 259;
            } else if (smallScreen && !audioPlaying) {
                minHeight = 207;
            } else if (!smallScreen && audioPlaying) {
                minHeight = 230;
            } else {
                minHeight = 180;
            }

            document.getElementById("layout").style.minHeight = `calc(100vh - ${minHeight}px)`;
        }
    }

    return (
        <div >
            <Nav location={location}  dark={dark} onSetDark={() => setDark(toggleDarkTheme())}  />
            {!search &&
                <header className={`${styles.appbar} ${main || post || page ? styles.mainappbar : ''}`}>
                    <div className={styles.appbarrow}>
                        {main &&
                            <section className={`${styles.section} ${styles.sectionalignstart} ${styles.searchsection}`}>
                                <div className={styles.searchbox}>
                                    <ReachLink to={withPrefix(slugs.search)} className={styles.searchicon}>
                                        <FontIcon>&#xe8b6;</FontIcon>
                                    </ReachLink>
                                    <ReachLink to={withPrefix(slugs.search)} className={styles.searchline}>
                                        {strings.searchInIstoriez}
                                    </ReachLink>
                                    <FontIcon className={styles.actionitem} onClick={() => setDark(toggleDarkTheme())}>{!mounted ? '' : dark ? <>&#xe430;</> : <>&#xef44;</>}</FontIcon>
                                </div>
                            </section>
                        }
                        {!main &&
                            <section className={`${styles.section} ${styles.sectionalignstart} ${styles.backarrow}`} >
                                <BackButton location={location} />
                            </section>
                        }
                        {post &&
                            <section className={`${styles.section} ${styles.sectionalignend}`} role="toolbar">
                                <FontIcon className={styles.actionitem} onClick={() => setDark(toggleDarkTheme())}>{!mounted ? '' : dark ? <>&#xe430;</> : <>&#xef44;</>}</FontIcon>
                            </section>
                        }
                    </div>
                </header>
            }
            <div id="layout" className={styles.layout}>
                {start ?
                    <Start pathname={location.pathname} selection={tag || author} ages={ages}>
                        {children}
                    </Start>
                    :
                    children
                }
            </div>
            <Footer />
            {audio && show &&
                <Audio audio={audio.publicURL} location={location} cover={cover} />
            }
        </div>
    );
}

export default Layout