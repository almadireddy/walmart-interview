import React from 'react'
import styles from '../styles/InfoPill.module.css'

const InfoPill = ({inline, children}) => {
    return (
        inline ? (
            <span className={styles.infoPill}>
                {children}
            </span>
        ) : (
            <div className={styles.infoPill}>
                {children}
            </div>
        )
    )
}

export default InfoPill;
