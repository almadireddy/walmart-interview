import React from 'react'
import styles from '../styles/List.module.css'

const List = ({children}) => {
    return (
        <ul className={styles.listContainer}>
            {children}
        </ul>
    )
}


const ListItem = ({children}) => {
    return (
        <li className={styles.listItem}>{children}</li>
    )
}

export { List, ListItem };
