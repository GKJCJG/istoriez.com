import React from 'react';
import styles from './InfoStory.module.scss';
import { strings } from '../../utils/localization';
import { minToHours } from '../../utils/time';
import FontIcon from '../FontIcons/FontIcon';
import { newStoriesTimeAgo } from '../../utils/time'
import Story from './Story'

const InfoStory = ({ children, extra, ...rest }) => {

    const info = (edge) => {
        if (!edge) {
            return null;
        }

        const { title, age } = edge.node.frontmatter;
        const { modified, viewsLastMonth, stars } = edge.node.fields;

        return (
            <div className={`infostorycontainer ${styles.infocontainer}`}>
                <div className={styles.info}>{title}</div>
                <div className={styles.secondInfo} data-nosnippet>
                    {children ||
                        <>
                            {minToHours(edge.node.timeToRead)}
                            {age &&
                                <span className={styles.ageInfo}>{process.env.GATSBY_SITE_LANG === 'en' ? `${strings.yearsShort} ${age}` : `${age} ${strings.yearsShort}`}</span>
                            }
                        </>
                    }
                </div>
                <div className={`${styles.secondInfo} ${styles.starsandreads}`} data-nosnippet>
                    {extra === 'modified' && newStoriesTimeAgo(new Date(modified))}
                    {extra === 'pageviews' && `${viewsLastMonth} ${strings.reads}`}
                    {!extra &&
                        <>
                            {stars !== '-' ?
                                <>
                                    {stars}<FontIcon style={{ fontSize: "13px", color: "#787878", marginLeft: "4px" }}>&#xe838;</FontIcon>
                                </>
                                :
                                <div>&nbsp;</div>
                            }
                        </>
                    }
                </div>
            </div>
        );
    }


    return (
        <Story info={info} {...rest} />
    );
}

export default InfoStory

