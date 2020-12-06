import React from 'react';
import styles from './EdgeStory.module.scss';
import StateLink from '../StateLink';

const EdgeStory = ({ edge, className }) => {    
    const {
        slug,
        image,
    } = edge.node.fields;

    const {
        author,
        font,
        lineheight,
        title,
        style: frontmatterStyle,
    } = edge.node.frontmatter;

    return (
        <div className={`${styles.storycontainer} ${className}`}>
            <StateLink to={slug} className={`${styles.story} story`}>
                <img className={styles.image} srcSet={image.childImageSharp.fixed.srcSet} alt="" />
                <div
                    style={{ fontSize: font ? `${font}px` : '', lineHeight: lineheight ? `${lineheight}` : '' }}
                    className={`storytitle ${frontmatterStyle === 'white' || frontmatterStyle === 'inverted' ? styles.titlewhite : styles.titleblack}`}
                >
                    {title}
                </div>
                <div className={frontmatterStyle === 'black' || frontmatterStyle === 'inverted' ? styles.authorblack : styles.author}>{author}</div>
            </StateLink>
        </div >
    );
}

export default EdgeStory;

