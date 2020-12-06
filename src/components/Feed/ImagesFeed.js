import React from 'react';
import styles from './ImagesFeed.module.scss';
import EdgeStory from '../Story/EdgeStory';
import { Helmet } from 'react-helmet';

const Feed = ({ edges }) => {
    return (
        <div>
            <Helmet>
                <style>{'body, html { background-color: transparent !important; }'}</style>
            </Helmet>
            <div className={styles.grid}>
                {edges && edges.map(edge => <EdgeStory key={edge.node.fields.slug} className={styles.story} edge={edge} />)}
            </div>
        </div>
    );
}

export default Feed;


