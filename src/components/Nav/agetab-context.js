import React from 'react'

export const AgeTabContext = React.createContext(
    {
        pathname: null,
        setPathname: () => { }
    }
);

const AgeTabProvider = ({ children }) => {
    const [pathname, setPathname] = React.useState('/');

    return (
        <AgeTabContext.Provider
            value={{
                pathname,
                setPathname
            }}
        >
            {children}
        </AgeTabContext.Provider>
    )
};

export default AgeTabProvider