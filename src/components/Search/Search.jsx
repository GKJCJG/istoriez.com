import { Link, withPrefix } from 'gatsby';
import styles from './Search.module.scss';
import { Helmet } from 'react-helmet';
import React from 'react';
import { strings, slugs } from '../../utils/localization';
import { Index } from "elasticlunr"
import Story from '../Story'
import FontIcon from '../FontIcons/FontIcon'

const ResultItem = ({ result }) => {
    if (result.type === 'Category') {
        return (
            <li>
                <Link replace to={`/${result.slug}${slugs.all.replace('/', '')}`}>
                    <div className={styles.resultItem}>
                        <div className={`${styles.image} ${styles.categoryicon}`}>
                            <FontIcon >&#xe574;</FontIcon>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.infochild}>
                                <div className={styles.title}>
                                    {result.title}
                                </div>
                                <div>
                                    {strings.category}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </li>
        )
    }

    if (result.type === 'Author') {
        return (
            <li>
                <Link replace to={`/${result.slug}${slugs.all.replace('/', '')}`}>
                    <div className={styles.resultItem}>
                        <div className={`${styles.image} ${styles.categoryicon}`}>
                            <FontIcon >&#xe7fd;</FontIcon>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.infochild}>
                                <div className={styles.title}>
                                    {result.title}
                                </div>
                                <div>
                                    {strings.author}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </li>
        )
    }

    return (
        <li>
            <Link replace to={result.slug}>
                <div className={styles.resultItem}>
                    <div className={styles.image}>
                        <Story className={styles.story} path={withPrefix(result.slug)} attributes={false} disabled />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.infochild}>
                            <div className={styles.title}>
                                {result.title}
                            </div>
                            <div>
                                {result.author}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}

const Search = ({ searchIndex }) => {
    const index = Index.load(searchIndex);
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState([]);

    const searchInput = React.useRef();

    const search = (event) => {
        const q = event.target.value

        typeof window !== "undefined" && process.env.NODE_ENV === 'production' && window.gtag(
            'config',
            'UA-138308572-3',
            {
                'page_title': 'Search Results',
                'page_path': withPrefix(`${slugs.search}?q=${q}`)
            });

        const r = getSearchResults(q)

        setQuery(q);
        setResults(r);
    }

    const getSearchResults = (query) => {
        return index
            .search(query, { expand: true })
            .map(({ ref }) => index.documentStore.getDoc(ref))
    }

    const clear = () => {
        setQuery('');
        setResults([]);
        searchInput.current.focus();
    }

    return (
        <>
            <Helmet>
                <title>{`${strings.search} - ${strings.title}`}</title>
            </Helmet>
            <div className={`${styles.search} ${query && query.length > 0 ? styles.searchwritten : ''}`}>
                <div className={styles.topbox}>
                    <FontIcon onClick={() => window.history.back()} className={`${styles.actionitem} ${styles.back}`}>&#xe5c4;</FontIcon>
                    <input ref={searchInput} autoFocus type="text" placeholder={strings.searchInIstoriez} value={query} onChange={search} />
                    <FontIcon onClick={() => clear()} className={`${styles.actionitem} ${styles.clear}`}>&#xe5cd;</FontIcon>

                </div>

                <ul>{results.map(result => <ResultItem key={result.id} result={result} />)}</ul>
            </div>
        </>
    );
};

export default Search;






