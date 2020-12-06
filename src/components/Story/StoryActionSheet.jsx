import React from 'react';
import styles from './StoryActionSheet.module.scss';
import { strings, slugs } from '../../utils/localization';
import StateLink from '../StateLink';
import FontIcon from '../FontIcons/FontIcon';
import { toggleFavorite } from '../utils/favoriteManager';
import kebabCase from 'lodash/kebabCase';
import ActionSheet from '../ActionSheet/ActionSheet'
import Button from '../Button/Button'
import { AudioContext } from '../Audio/audio-context';

const StoryActionSheet = ({ edge, favorite, setFavorite }) => {
    const {
        authorSlug,
        slug,
        audio,
        cover
    } = edge.node.fields;

    const {
        author,
        tags,
        title,
    } = edge.node.frontmatter;

    const [more, setMore] = React.useState(false)

    return (
        <>
            <FontIcon className={styles.more} onClick={() => setMore(true)} >&#xe5d4;</FontIcon>
            {more &&
                <ActionSheet onClose={() => setMore(false)}>
                    <div className={styles.top}>
                    <img className={styles.topimg} src={cover.childImageSharp.fixed.src} alt=""  />
                            
                        <div className={styles.toptext}>
                            <h1>{title}</h1>
                            <div className={styles.author}><span style={{ verticalAlign: "middle" }}>{author}</span></div>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <StateLink to={authorSlug}>
                                <FontIcon className={styles.heart} >&#xe7fd;</FontIcon>
                                {`${strings.moreBy} ${author}...`}
                            </StateLink>
                        </li>
                        {tags &&
                            tags.map(tag =>
                                <li key={tag}>
                                    <StateLink to={`/${kebabCase(tag)}${slugs.all}`}>
                                        <FontIcon className={styles.heart} >&#xe574;</FontIcon>
                                        {`${strings.moreFrom} ${tag}...`}
                                    </StateLink>
                                </li>
                            )
                        }
                        <li onClick={() => setFavorite(toggleFavorite(slug))} style={{ padding: "12px 25px", cursor: "pointer" }}>
                            <FontIcon className={`${styles.heart} ${favorite ? styles.redheart : ''}`} >{favorite ? <>&#xe87d;</> : <>&#xe87e;</>}</FontIcon>
                            {favorite ?
                                strings.removeFromFavorites
                                :
                                strings.addToFavorites}
                        </li>
                        <li className={styles.actionbuttons}>
                            <StateLink to={slug}>
                                <Button style={{ width: "100%", margin: "0" }}>
                                    {strings.read}
                                </Button>
                            </StateLink>
                            {audio &&
                                <AudioContext.Consumer>
                                    {({ setSlug, setAudio, setShow, setCover }) => (
                                        <div className={styles.listenbuttoncontainer}>
                                            <Button onClick={() => { setSlug(slug), setAudio(audio); setShow(true), setCover(cover.childImageSharp.fixed.src) }} style={{ margin: 0, width: "100%" }}>
                                                {strings.listenNow}
                                            </Button>
                                        </div>
                                    )}
                                </AudioContext.Consumer>
                            }
                        </li>
                    </ul>
                </ActionSheet>
            }
        </>
    );
}

export default StoryActionSheet;

