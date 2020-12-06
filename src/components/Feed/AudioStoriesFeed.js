import React from 'react';
import EdgeCoverStory from '../Story/EdgeCoverStory';
import { AudioContext } from '../Audio/audio-context';
import styles from './AudioStoriesFeed.module.scss';

const AudioListItem = ({ edge }) => {
    const {
        title,
        author,
    } = edge.node.frontmatter;

    const {
        cover,
        audio: nodeAudio,
        slug,
    } = edge.node.fields;

    const audioContext = React.useContext(AudioContext)

    return (
        <li>
            <div className={styles.resultItem} onClick={() => { audioContext.setSlug(slug); audioContext.setAudio(nodeAudio); audioContext.setShow(true), audioContext.setCover(cover.childImageSharp.fixed.src) }}>
                <div className={styles.image}>
                    <EdgeCoverStory className={styles.story} edge={edge} attributes={false} disabled />
                </div>
                <div className={styles.info}>
                    <div className={styles.infochild}>
                        <div className={styles.title} style={nodeAudio && audioContext.audio && nodeAudio.publicURL === audioContext.audio.publicURL ? { color: "#2196f3" } : {}}>
                            {title}
                        </div>
                        <div className={styles.author}>
                            {author}
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

const AudioStoriesFeed = ({ edges, children }) => {
    return (
        <div className={styles.audiostoriesfeed}>
            {children}
            <ul>
                {edges && edges.map(edge => <AudioListItem edge={edge} key={edge.node.fields.slug} />)}
            </ul>
        </div>
    );
}

export default AudioStoriesFeed;
