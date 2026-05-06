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

interface Props {
  isOpen: boolean;
  closeSidebar: () => void;
  isPlayerOpen: boolean;
  setFontSize: (size: string) => void;
}

export default function VerticalNavBar({ isOpen, closeSidebar, isPlayerOpen , setFontSize}: Props) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`} >
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <nav className={styles.nav}>
        <Link href="/for-you" className={styles.navItem} onClick={closeSidebar}> 
            <FontAwesomeIcon icon={faHouse} />For You</Link>
        <Link href="" className={styles.navItem}>
            <FontAwesomeIcon icon={faBookOpen} />My Library</Link>
        <Link href="" className={styles.navItem + ' ' + styles.cursorNotAllowed}>
            <FontAwesomeIcon  icon={faPen} />Highlights</Link>
        <Link href="" className={styles.navItem + ' ' + styles.cursorNotAllowed}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />Search</Link>
        
        {isPlayerOpen && (
          <div className={styles.fontSize}>
              <button style={{ fontSize: '16px' }} className={styles.underline} onClick={() => setFontSize("small")}>
                Aa
              </button>
              <button style={{ fontSize: '18px' }} className={styles.underline}  onClick={() => setFontSize("medium")}>
                Aa
              </button>
              <button style={{ fontSize: '22px' }} className={styles.underline} onClick={() => setFontSize("large")}>
                Aa
              </button>
              <button style={{ fontSize: '26px' }} className={styles.underline} onClick={() => setFontSize("x-large")}>
                Aa
              </button>
          </div>
        )}
        </nav>
        <div className={styles.bottomNav}>
        <Link href="/settings" className={styles.navItem} onClick={closeSidebar}>
            <FontAwesomeIcon icon={faGear} /> Settings</Link>
        <Link href="" className={styles.navItem + ' ' + styles.cursorNotAllowed} onClick={closeSidebar}>
            <FontAwesomeIcon icon={faCircleQuestion} /> Help & Support</Link>
        <Link href="/logout" className={styles.navItem} onClick={closeSidebar}>
            <FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link>
        </div>
    </div>
  )
}
