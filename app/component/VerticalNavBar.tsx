import React from 'react'
import styles from '../foryou.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import {
  faHouse,
  faBookOpen,
  faPen,
  faMagnifyingGlass,
  faGear,
  faCircleQuestion,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

export default function VerticalNavBar() {
  return (
    <div className={styles.sidebar}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <nav className={styles.nav}>
        <Link href="/for-you" className={styles.navItem}>
            <FontAwesomeIcon icon={faHouse} />For You</Link>
        <Link href="/my-library" className={styles.navItem}>
            <FontAwesomeIcon icon={faBookOpen} />My Library</Link>
        <Link href="/for-you" className={styles.navItem + ' ' + styles.cursorNotAllowed}>
            <FontAwesomeIcon  icon={faPen} />Highlights</Link>
        <Link href="/for-you" className={styles.navItem + ' ' + styles.cursorNotAllowed}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />Search</Link>
        </nav>
        <div className={styles.bottomNav}>
        <Link href="/settings" className={styles.navItem}><FontAwesomeIcon icon={faGear} /> Settings</Link>
        <Link href="/for-you" className={styles.navItem + ' ' + styles.cursorNotAllowed}><FontAwesomeIcon icon={faCircleQuestion} /> Help & Support</Link>
        <Link href="/logout" className={styles.navItem}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link>
        </div>
    </div>
  )
}
