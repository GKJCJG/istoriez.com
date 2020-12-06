import React from 'react'

export const LongStoriesContext = React.createContext(
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

const LongStoriesProvider = ({ children }) => {
    const [jsonSlug, setJsonSlug] = React.useState([]);
    const [remainingSlugs, setRemainingSlugs] = React.useState([]);
    const [renderedSlugs, setRenderedSlugs] = React.useState([]);
    const [scrollPosition, setScrollPosition] = React.useState([]);
    
    return (
        <LongStoriesContext.Provider
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
        </LongStoriesContext.Provider>
    )
};

export default LongStoriesProvider