import React from 'react';
import styles from './EdgeCoverStory.module.scss';
import StateLink from '../StateLink';
import FontIcon from '../FontIcons/FontIcon';
import { isFavoriteSlug } from '../utils/favoriteManager';
import StoryActionSheet from './StoryActionSheet'
import Img from "gatsby-image"
import {strings} from '../../utils/localization'

const GatsbyEdgeCoverStory = ({ edge, className, children }) => {
    const {
        slug,
        audio,
        cover
    } = edge.node.fields;

    const {
        title,
        author
    } = edge.node.frontmatter;

    const [favorite, setFavorite] = React.useState(isFavoriteSlug(slug))

    return (
        <div className={`${styles.storycontainer} ${className}`}>
            <StoryActionSheet edge={edge} favorite={favorite} setFavorite={setFavorite} />
            <div className={`${styles.emptycontainer} ${styles.storyplaceholder} emptycontainer`} />
            <StateLink to={slug} className={`${styles.story} story ${styles.storyborder}`}>
                <Img className={styles.image} fixed={cover.childImageSharp.fixed} alt={`${title} ${strings.by} ${author}`} loading='eager' fadeIn={false}/>
                {favorite && <FontIcon className={styles.favorite}>&#xe87d;</FontIcon>}
                {audio && <FontIcon className={styles.audio}>&#xe310;</FontIcon>}
                {children}
            </StateLink>
        </div >
    );
}

export default GatsbyEdgeCoverStory;

