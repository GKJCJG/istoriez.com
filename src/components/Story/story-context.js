import React from 'react'

export const StoryContext = React.createContext(
    {
        stories: {},
        setStories: () => { },
    }
);

const StoryProvider = ({ children }) => {
    const [stories, setStories] = React.useState({});

    return (
        <StoryContext.Provider
            value={{
                stories,
                setStories
            }}
        >
            {children}
        </StoryContext.Provider>
    )
};

export default StoryProvider