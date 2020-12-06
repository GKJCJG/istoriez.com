import React from 'react';
import styles from './Feed.module.scss';
import InfoStory from '../Story/InfoStory';
import { withPrefix } from 'gatsby';
import { clickEvent } from '../../utils/analytics'
import ls from 'local-storage';
import FontIcon from '../FontIcons/FontIcon'
import Chip from '../Chips/Chip';
import { FeedContext } from './feed-context';

const ResultItem = ({ children, path }) => {
    const [edge, setEdge] = React.useState()

    if (path) {
        React.useEffect(() => {
            fetch(`${path.slice(0, -1)}.json`)
                .then((response) => {
                    return response.json();
                })
                .then((edge) => {
                    setEdge(edge);
                });
        }, []);
    }

    return (
        <div>
            <h2>{edge ? edge.node.frontmatter.title : <>&nbsp;</>}</h2>
            <div className={styles.resultItem}>
                <div className={styles.image}>
                    {children}
                </div>
                <div className={styles.info}>
                    <div>{edge && edge.node.excerpt}</div>
                </div>
            </div>
        </div>
    );
}

const Feed = ({ title, slugsHref, extra, chips, children }) => {
    const feedContext = React.useContext(FeedContext);

    const [list, setList] = React.useState(ls("feed") === 'list')

    const gridButtonClick = () => {
        ls("feed", 'grid');
        clickEvent("Feed", "Grid", true)
        setList(false)
    }

    const listButtonClick = () => {
        ls("feed", 'list');
        clickEvent("Feed", "List", true)
        setList(true)
    }

    React.useEffect(() => {
        if (feedContext.slugsHref !== slugsHref) {
            feedContext.setPaths(null);

            fetch(slugsHref)
                .then((response) => {
                    return response.json();
                })
                .then((slugs) => {
                    feedContext.setSlugsHref(slugsHref)

                    feedContext.setPaths(slugs.map(slug => withPrefix(slug)));
                });
        }
    }, [slugsHref]);

    return (
        <>
            <div className={styles.listbuttonscontainer}>
                <div className={styles.listbutton}>
                    {!list ?
                        <FontIcon className={styles.button} onClick={() => listButtonClick()}>&#xe8ef;</FontIcon>
                        :
                        <FontIcon className={styles.button} onClick={() => gridButtonClick()}>&#xe8f0;</FontIcon>
                    }
                </div>
            </div>
            <div className={styles.feed}>
                <h1 className={styles.h1}>
                    {!chips && title}
                    <div className={styles.chipscontainer}>
                        {chips && chips.map(chip =>
                            <Chip style={{ margin: "10px 5px" }} key={chip.label} active={true} link={chip.link} closeLink={chip.closeLink} label={chip.label} />
                        )}
                    </div>
                </h1>
                {children}
                {!list ?
                    <div className={styles.grid}>
                        {feedContext.paths && feedContext.paths.map(path => <InfoStory key={path} className={styles.story} path={path} extra={extra} noemptycontainer />)}
                    </div>
                    :
                    <div className={styles.listgrid}>
                        {feedContext.paths && feedContext.paths.map(path => <ResultItem path={path} key={path}><InfoStory className={styles.story} path={path} extra={extra} /></ResultItem>)}
                    </div>
                }
            </div>
        </>
    );
}

export default Feed;
