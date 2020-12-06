import React from 'react'

export const StoryLoadedContext = React.createContext(
    {
        stories: {},
        setStories: () => { },
    }
);

const StoryLoadedProvider = ({ children }) => {
    const [stories, setStories] = React.useState({});

    return (
        <StoryLoadedContext.Provider
            value={{
                stories,
                setStories
            }}
        >
            {children}
        </StoryLoadedContext.Provider>
    )
};

export default StoryLoadedProvider