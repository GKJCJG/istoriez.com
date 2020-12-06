import config from "../../../config";
import kebabCase from 'lodash/kebabCase';
import styles from './Post.module.scss';
import { Helmet } from 'react-helmet';
import React from 'react';
import { slugs, strings } from '../../utils/localization';
import { removeRecentlyRead, addRecentlyRead } from '../utils/recentlyReadManager';
import { isUppercase, toggleUppercase } from '../../utils/text'
import StateLink from '../StateLink';
import ShareDialog from '../ShareDialog';
import AdSense from '../AdSense/AdSense'
import Stars from '../Stars/Stars'
import Heart from './Heart'
import FontIcon from '../FontIcons/FontIcon'
import { minToHours } from '../../utils/time';
import Carousel from '../Carousel'
import { AudioContext } from '../Audio/audio-context';
import LinkTitle from '../LinkTitle'
import Img from "gatsby-image"

const Post = ({ post, pageTitle, location }) => {
    const {
        title,
        author,
        tags
    } = post.frontmatter;

    const {
        views,
        cover,
        serpcover,
        audio,
        stars,
        starVotes,
        narrator,
        slug,
        authorSlug,
    } = post.fields;

    React.useEffect(() => {
        removeRecentlyRead(slug);
        addRecentlyRead(slug);
        setMounted(true)
    }, [])

    const [uppercase, setUppercase] = React.useState(isUppercase())
    const [mounted, setMounted] = React.useState(false);

    const { timeToRead, excerpt, html } = post;

    React.useEffect(() => {
        const script = document.createElement('script');

        script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <Helmet>
                <html lang={strings.htmlLang} />
                <title>{pageTitle}</title>
                <meta property="fb:app_id" content={process.env.GATSBY_SITE_LANG === 'en' ? "753193208835699" : "2372934363009716"} />
                <meta name="description" content={excerpt} />
                <meta property="og:title" content={pageTitle.replace(' - iStoriez', '')} />
                <meta property="og:description" content={excerpt} />
                <meta property="og:type" content="book" />
                <meta property="og:url" content={`${config.url}${slug}`} />
                <meta property="og:site_name" content='iStoriez' />
                <meta property="og:image" content={`https://www.istoriez.com${serpcover.childImageSharp.fixed.src}`} />
                <meta property="og:image:width" content="200" />
                <meta property="og:image:height" content="200" />
                <meta property="book:author" content={author} />
                {process.env.GATSBY_SITE_LANG !== 'en' &&
                    <meta property="og:locale" content="sv_SE" />
                }
            </Helmet>
            <div className={styles.introbox}>
                <div>
                    <Img className={styles.image} fixed={serpcover.childImageSharp.fixed} alt="" loading='eager' fadeIn={false} />
                </div>
                <div className={styles.introcontainer}>
                    <h1>{title}</h1>
                    <StateLink to={authorSlug}>
                        <div className={styles.author}><span style={{ verticalAlign: "middle" }}>{author}</span></div>
                    </StateLink>
                    {narrator &&
                        <StateLink to={`/${kebabCase(narrator)}${slugs.all}`}>
                            <div className={styles.narrator} data-nosnippet><FontIcon style={{ verticalAlign: "middle", color: "#787878" }}>&#xe91f;</FontIcon> <span style={{ verticalAlign: "middle" }}>{narrator}</span></div>
                        </StateLink>
                    }
                </div>
            </div>
            <div className={styles.starandsharecontainer} style={{ marginTop: "-1px" }} data-nosnippet>
                <div className={styles.starcontainer}>
                    <div><span className={styles.number}>{stars}</span> <FontIcon>&#xe838;</FontIcon></div>
                    {starVotes} {strings.votes}
                </div>
                {views &&
                    <div className={styles.starcontainer}>
                        <div><FontIcon>&#xe01d;</FontIcon></div>
                        {views} {strings.views}
                    </div>
                }
                <div className={styles.starcontainer}>
                    <div><FontIcon>&#xe425;</FontIcon></div>
                    {minToHours(timeToRead)}
                </div>
            </div>
            <div className={styles.buttonscontainer} style={{ marginTop: "-1px" }} data-nosnippet>
                {audio &&
                    <AudioContext.Consumer>
                        {({ setSlug, setAudio, setShow, setCover, audio: contextAudio, show }) => (
                            <FontIcon onClick={() => { setSlug(slug), setAudio(contextAudio ? null : audio); setShow(!contextAudio), setCover(cover ? cover.childImageSharp.fixed.src : null) }} style={contextAudio && show ? { color: "#2196f3" } : {}}>&#xe310;</FontIcon>
                        )}
                    </AudioContext.Consumer>
                }
                <FontIcon className={`${styles.actionitem} ${mounted && uppercase ? styles.blue : ''}`} onClick={() => setUppercase(toggleUppercase())}>&#xe245;</FontIcon>
                <ShareDialog /> <Heart pathname={location.pathname} />
            </div>
            <div className={`${styles.story} ${uppercase ? styles.uppercase : ''}`} style={{ marginTop: "-1px" }}>
                <div
                    dangerouslySetInnerHTML={{ __html: html }}
                />
                <AdSense style={{ marginTop: "-1px" }} />
                <p style={{ marginBottom: "10px", marginTop: "25px" }}>
                    {strings.theEnd}
                </p>
            </div>
            <div className={styles.votecontainer}>
                <Stars path={`${location.pathname}`} />
            </div>
            <div className={styles.infocontainer}>
                {tags && tags.length > 0 &&
                    <>
                        <LinkTitle title={strings.categories} />
                        <div className={styles.infobox} style={{ paddingTop: "10px" }}>
                            <ChipCarousel center={false} group={tags.map(tag => ({ fieldValue: tag }))} prefix={'/'} suffix={slugs.all} />
                        </div>
                    </>
                }
                <LinkTitle href={authorSlug} title={`${strings.moreBy} ${author}`} />
                <Carousel rightScrollMargin={150} jsonSlug={authorSlug} />
            </div>
            <div style={{ minHeight: 50 }}></div>
        </div>
    );
};

export default Post;
