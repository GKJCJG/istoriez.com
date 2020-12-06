import React from 'react'

export const LatestStoriesContext = React.createContext(
    {
        scrollPosition: null,
        inView: {0: true},
        setScrollPosition: () => { },
        setInView: () => { },
    }
);

const LatestStoriesProvider = ({ children }) => {
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const [inView, setInView] = React.useState({0: true});
    
    return (
        <LatestStoriesContext.Provider
            value={{
                scrollPosition,
                inView,
                setScrollPosition,
                setInView
            }}
        >
            {children}
        </LatestStoriesContext.Provider>
    )
};

export default LatestStoriesProvider