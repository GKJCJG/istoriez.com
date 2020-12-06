import React from 'react';
import styles from './EdgeCoverStory.module.scss';
import StateLink from '../StateLink';
import FontIcon from '../FontIcons/FontIcon';
import { isFavoriteSlug } from '../utils/favoriteManager';
import StoryActionSheet from './StoryActionSheet'
import { StoryLoadedContext } from './storyloaded-context'
import { strings } from '../../utils/localization'

const EdgeCoverStory = ({ edge, className, style, attributes = true, disabled = false, preload = false, children, info, noemptycontainer }) => {
    const {
        slug,
        audio,
        cover
    } = edge.node.fields;

    const {
        author,
        title
    } = edge.node.frontmatter;

    const storyLoadedContext = React.useContext(StoryLoadedContext)

    const [loaded, setLoaded] = React.useState(storyLoadedContext.stories[slug])
    const [favorite, setFavorite] = React.useState(isFavoriteSlug(slug))

    const realLoaded = () => {
        if (loaded) {
            return
        }

        setLoaded(true)

        const edges = storyLoadedContext.stories;
        edges[slug] = true;

        storyLoadedContext.setStories(edges);
    }



    return (
        <div className={`${styles.storycontainer} ${className}`} style={style}>
            {attributes && loaded &&
                <StoryActionSheet edge={edge} favorite={favorite} setFavorite={setFavorite} />
            }
            {!noemptycontainer &&
                <div className={`${styles.emptycontainer} ${styles.storyplaceholder} emptycontainer`} />
            }
            <StateLink to={slug} className={`${styles.story} story ${loaded || preload ? styles.storyborder : ''}`} disabled={disabled}>
                {
                    noemptycontainer && !loaded &&
                    <img className={styles.placeholderimg} src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAADFCAQAAAAcEsMwAAABHElEQVR42u3QMQ0AAAwDoNW/6Vno2wQkkKMWBbJkyZIlS5YCWbJkyZIlS4EsWbJkyZKlQJYsWbJkyVIgS5YsWbJkKZAlS5YsWbIUyJIlS5YsWQpkyZIlS5YsBbJkyZIlS5YCWbJkyZIlS4EsWbJkyZKlQJYsWbJkyVIgS5YsWbJkKZAlS5YsWbIUyJIlS5YsWQpkyZIlS5YsBbJkyZIlS5YCWbJkyZIlS4EsWbJkyZKlQJYsWbJkyVIgS5YsWbJkKZAlS5YsWbIUyJIlS5YsWQpkyZIlS5YsBbJkyZIlS5YCWbJkyZIlS4EsWbJkyZKlQJYsWbJkyVIgS5YsWbJkKZAlS5YsWbIUyJIlS5YsWQpkyZIlS5YsBbJkyRrygCoAxkX5yP0AAAAASUVORK5CYII="></img>
                }
                {noemptycontainer &&
                    <img className={`edgecoverstoryimage ${styles.image}`} onLoad={() => realLoaded()} srcSet={cover.childImageSharp.fixed.srcSet} alt={`${title} ${strings.by} ${author}`} style={!loaded ? {display: "none"} : {}}/>
                }
                {!noemptycontainer &&
                    <img className={`edgecoverstoryimage ${styles.image}`} onLoad={() => realLoaded()} srcSet={cover.childImageSharp.fixed.srcSet} alt={`${title} ${strings.by} ${author}`} />
                }

                {attributes && favorite && loaded && <FontIcon className={styles.favorite}>&#xe87d;</FontIcon>}
                {attributes && audio && loaded && <FontIcon className={styles.audio}>&#xe310;</FontIcon>}
                {children}
            </StateLink>
            {info && info(edge)}
        </div >
    );
}

export default EdgeCoverStory;

