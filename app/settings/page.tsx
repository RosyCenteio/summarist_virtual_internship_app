'use client';
import React from 'react'
import styles from '../foryou.module.css'
import VerticalNavBar from '../component/VerticalNavBar'
import NavBar from '../for-you/NavBar'
import { useAuth } from './../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <VerticalNavBar />
      <NavBar />
      <div className={styles.section}>
        <h1 className={styles.settingsTitle}>Settings</h1>
        <div className={styles.horizontallyDivider}></div>
        <h2 className={styles.settingsSubTitle}>Your Subscription plan</h2>
        <p>premium-plus</p>
        <div className={styles.horizontallyDivider}></div>
        <h2 className={styles.settingsSubTitle}>Email</h2>
        <p>{user?.email}</p>
      </div>
    </div>
  )
}
