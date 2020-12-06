import React from 'react'

export const ShortStoriesContext = React.createContext(
    {
        jsonSlug: null,
        remainingSlugs: null,
        renderedSlugs: null,
        scrollPosition: null,
        setJsonSlug: () => { },
        setRemainingSlugs: () => { },
        setRenderedSlugs: () => { },
        setScrollPosition: () => { },
    }
);

const ShortStoriesProvider = ({ children }) => {
    const [jsonSlug, setJsonSlug] = React.useState([]);
    const [remainingSlugs, setRemainingSlugs] = React.useState([]);
    const [renderedSlugs, setRenderedSlugs] = React.useState([]);
    const [scrollPosition, setScrollPosition] = React.useState([]);
    
    return (
        <ShortStoriesContext.Provider
            value={{
                jsonSlug,
                remainingSlugs,
                renderedSlugs,
                scrollPosition,
                setJsonSlug,
                setRemainingSlugs,
                setRenderedSlugs,
                setScrollPosition
            }}
        >
            {children}
        </ShortStoriesContext.Provider>
    )
};

export default ShortStoriesProvider