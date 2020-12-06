import React from 'react'

export const AudioContext = React.createContext(
    {
        audio: null,
        cover: null,
        show: false,
        slug: null,
        setAudio: () => { },
        setSlug: () => { },
        setShow: () => { },
        setCover: () => { }
    }
);

const AudioProvider = ({ children }) => {
    const [audio, setAudio] = React.useState(null);
    const [cover, setCover] = React.useState(null);
    const [show, setShow] = React.useState(false);
    const [slug, setSlug] = React.useState(null);

    return (
        <AudioContext.Provider
            value={{
                audio,
                show,
                cover,
                slug,
                setAudio,
                setShow, 
                setCover,
                setSlug
            }}
        >
            {children}
        </AudioContext.Provider>
    )
};

export default AudioProvider