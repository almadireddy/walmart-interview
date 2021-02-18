import React from 'react'
import styles from '../styles/Header.module.css'

const Header = ({title, description}) => {
    return (
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <h1 className={styles.title}>{title}</h1>
            {description && (
                <p className={styles.description}>{description}</p>
            )}
          </div>
        </div>
    )
}

export default Header;
