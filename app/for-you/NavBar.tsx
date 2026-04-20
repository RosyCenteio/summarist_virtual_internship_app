import React from 'react'
import styles from '../foryou.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";


export default function NavBar() {
  return (
    <>
       <section id='header' className={styles.content}>
                <header className={styles.header}>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Search for books" />
                    <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>
                </header>
        </section>

        <div className={styles.horizontallyDivider}></div>
    </>
  )
}
