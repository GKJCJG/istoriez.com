import React from 'react'
import styles from './Audio.module.scss';
import { clickEvent } from '../../utils/analytics'
import FontIcon from '../FontIcons/FontIcon'
import { AudioContext } from '../Audio/audio-context';
import StateLink from '../StateLink';

const pretty = (s) => { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s }

const Audio = ({ audio, cover, location, ...rest }) => {
    const [duration, setDuration] = React.useState(undefined);
    const [currentTime, setCurrentTime] = React.useState(pretty(0));
    const [progress, setProgress] = React.useState(0);
    const [playing, setPlaying] = React.useState(false);

    React.useEffect(() => {
        play(true);
    }, [audio]);

    const play = (value) => {
        setPlaying(value)
        clickEvent("PlayAudio", location.pathname, value)

        if (value) {
            document.getElementById("player").play()
        } else {
            document.getElementById("player").pause()
        }
    }

    const replay = () => {
        document.getElementById("player").currentTime = 0;
        play(true)
    }

    const audioContext = React.useContext(AudioContext);

    const close = () => {
        audioContext.setShow(false);
        audioContext.setAudio(null);
        audioContext.setCover(null);
        audioContext.setSlug(null);
    }

    return (
        <>
            <div style={{ minHeight: "50px" }}></div>
            <div {...rest} className={styles.audio} >
                <audio id="player" src={audio} onTimeUpdate={(e) => { setCurrentTime(pretty(Math.round(e.target.currentTime))); setProgress(e.target.currentTime / e.target.duration) }} onCanPlay={(e) => setDuration(pretty(Math.round(e.target.duration)))} onEnded={() => setPlaying(false)} />
                <StateLink to={audioContext.slug}>
                    <img className={styles.cover} src={cover} alt="" />
                </StateLink>
                <FontIcon className={styles.playpause} onClick={() => play(!playing)}>{playing ? <>&#xe034;</> : <>&#xe037;</>}</FontIcon>
                <FontIcon className={styles.replay} onClick={() => replay()}>&#xe042;</FontIcon>
                <div className={styles.progressbar} >
                    <div style={{ width: `${progress * 100}%` }} className={styles.progress} />
                </div>
                {duration &&
                    <div className={styles.duration}>{currentTime} / {duration}</div>
                }
                <FontIcon className={styles.close} onClick={() => close()}>&#xe5cd;</FontIcon>
            </div>
        </>
    );
}

export default Audio;