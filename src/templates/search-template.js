import React from 'react';
import Search from '../components/Search/Search';
import { graphql } from 'gatsby';

const SearchTemplate = ({ data, location }) => {
    return (
        <Search location={location} searchIndex={data.siteSearchIndex.index} />
    );
};

export const query = graphql`
query SearchTemplate {
    siteSearchIndex {
        index
    }
}
`;

export default SearchTemplate
