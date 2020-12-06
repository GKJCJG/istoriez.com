import React from 'react'

export const FeedContext = React.createContext(
    {
        paths: null,
        setPaths: () => { },
        slugsHref: null,
        setSlugsHref: () => { },
    }
);

const FeedProvider = ({ children }) => {
    const [paths, setPaths] = React.useState([]);
    const [slugsHref, setSlugsHref] = React.useState([]);

    return (
        <FeedContext.Provider
            value={{
                paths,
                setPaths,
                slugsHref,
                setSlugsHref
            }}
        >
            {children}
        </FeedContext.Provider>
    )
};

export default FeedProvider