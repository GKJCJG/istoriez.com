import React from 'react'

export const MediumStoriesContext = React.createContext(
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

const MediumStoriesProvider = ({ children }) => {
    const [jsonSlug, setJsonSlug] = React.useState([]);
    const [remainingSlugs, setRemainingSlugs] = React.useState([]);
    const [renderedSlugs, setRenderedSlugs] = React.useState([]);
    const [scrollPosition, setScrollPosition] = React.useState([]);
    
    return (
        <MediumStoriesContext.Provider
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
        </MediumStoriesContext.Provider>
    )
};

export default MediumStoriesProvider