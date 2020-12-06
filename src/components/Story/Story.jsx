import React from 'react';
import styles from './Story.module.scss';
import EdgeCoverStory from './EdgeCoverStory'
import { StoryContext } from './story-context'

const Story = ({ path, className, style, info, ...rest }) => {
    const storyContext = React.useContext(StoryContext)
    const [loaded, setLoaded] = React.useState(storyContext.stories[path])

    const { noemptycontainer } = rest;

    React.useEffect(() => {
        if (!storyContext.stories[path]) {
            fetch(`${path.slice(0, -1)}.json`)
            .then((response) => {
                return response.json();
            })
            .then((edge) => {
                const edges = storyContext.stories;
                edges[path] = edge;

                storyContext.setStories(edges);

                setLoaded(true)
            });
        }
    }, [path]);

    if (!storyContext.stories[path] && noemptycontainer) {
        return null;
    }
    
    if (!storyContext.stories[path]) {
        return (
            <div className={`${styles.storycontainer} ${className}`} style={style}>
                <div className={`${styles.emptycontainer} emptycontainer`}></div>
                {info &&
                    <div>
                        <div className={styles.info}>&nbsp;</div>
                        <div className={styles.secondInfo} >&nbsp;</div>
                    </div>
                }
            </div>
        );
    }

    return <EdgeCoverStory edge={storyContext.stories[path]} className={className} info={info} style={style} {...rest} />
}

export default Story;

