import React from 'react';
import cn from 'classnames';
import styles from './Switch.module.scss'

const Switch = ({ defaultChecked, onChange, id, name, label, className }) => {
    const [checked, setChecked] = React.useState(!!defaultChecked)

    const handleChange = (e) => {
        onChange(!checked, e);

        setChecked(!checked);
    };

    return (
        <div className={className}>
            <input
                id={id}
                type='checkbox'
                checked={checked}
                onChange={handleChange}
                className={styles.input}
                name={name}
            />
            <label htmlFor={id} className={styles.label} >
                <div className={cn(styles.track,  { [styles.trackon]: checked, [styles.trackoff]: !checked })} >
                    <div className={cn(styles.thumb, { [styles.thumbon]: checked, [styles.thumboff]: !checked })} />
                </div>
                {label}
            </label>
        </div>
    );
}

export default Switch;