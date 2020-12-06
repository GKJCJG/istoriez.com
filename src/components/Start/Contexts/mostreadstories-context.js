import React from 'react'

export const MostReadStoriesContext = React.createContext(
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

const MostReadStoriesProvider = ({ children }) => {
    const [jsonSlug, setJsonSlug] = React.useState([]);
    const [remainingSlugs, setRemainingSlugs] = React.useState([]);
    const [renderedSlugs, setRenderedSlugs] = React.useState([]);
    const [scrollPosition, setScrollPosition] = React.useState([]);
    
    return (
        <MostReadStoriesContext.Provider
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
        </MostReadStoriesContext.Provider>
    )
};

export default MostReadStoriesProvider