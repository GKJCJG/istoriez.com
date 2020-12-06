import React from 'react'
import { strings, slugs } from '../../utils/localization';
import { StaticQuery, graphql } from "gatsby"
import FavoriteCarousel from '../FavoriteCarousel';
import SelectorChip from './SelectorChip';
import AgeTabs from '../AgeTabs/AgeTabs';
import Page from '../Page';
import LinkTitle from '../LinkTitle'
import Selector from './Selector'
import styles from './Start.module.scss'

const Start = ({ children, pathname, selection, ages }) => {
    return (
        <Page fullWidth removeSuffix>
            <StaticQuery
                query={graphql`
                query StartQueryTop {
                    allMarkdownRemark(filter: { frontmatter: { author: { ne: null } } }) {
                        categories: group(field: frontmatter___tags) {
                            fieldValue
                        }
                        authors: group(field: frontmatter___author) {
                            fieldValue
                        }
                    }
                    newStories: allMarkdownRemark(sort: {fields: fields___modified, order: DESC}, filter: { frontmatter: { author: { ne: null } } }, limit: 10){
                        edges {
                            node {
                                fields {
                                    slug
                                    modified
                                    viewsLastMonth
                                    stars
                                    cover {
                                        childImageSharp {
                                            fixed(width: 150) {
                                                ...GatsbyImageSharpFixed
                                            }
                                        }
                                    }
                                    authorSlug
                                    audio {
                                        publicURL
                                    }
                                }
                                frontmatter {
                                    tags
                                    title
                                    author
                                    age
                                }
                                timeToRead
                            }
                        }
                    }
                }
            `}
                render={data => (
                    <div style={{position: "relative"}}>
                        <div className='moon' />
                        <div className='stars' />
                        <div className='twinkling' />
                        {data.newStories.edges && data.newStories.edges.length > 0 &&
                            <div className={styles.container}>
                                <LinkTitle className={styles.linktitle} title={strings.newStories} href={slugs.newStories} />
                                <FavoriteCarousel edges={data.newStories.edges} />
                            </div>
                        }
                        <div style={{ textAlign: "center" }}>
                            <Selector group={data.allMarkdownRemark.categories} pathname={pathname} title={strings.categories} style={{ marginRight: "20px" }} />
                            <Selector group={data.allMarkdownRemark.authors} pathname={pathname} title={strings.authors} style={{ marginLeft: "20px" }} />
                        </div>
                        <SelectorChip suffix={slugs.all} style={{ marginTop: 25 }} group={data.allMarkdownRemark.categories} pathname={pathname} />
                        <SelectorChip suffix={slugs.all} style={{ marginTop: 25 }} group={data.allMarkdownRemark.authors} pathname={pathname} />
                        <AgeTabs pathname={pathname} selection={selection} ages={ages} />
                    </div>
                )}
            />
            {children}
        </Page>
    );
}

export default Start;