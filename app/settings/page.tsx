'use client';
import React, { useEffect, useState } from 'react'
import styles from '../foryou.module.css'
import VerticalNavBar from '../component/VerticalNavBar'
import NavBar from '../for-you/NavBar'
import { useAuth } from './../context/AuthContext';
import Link from 'next/link';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; 
import Login from '../component/auth/login';
export default function Settings() {
   const { user } = useAuth();
   const[isSidebarOpen, setIsSidebarOpen] = useState(false);
   const[isPlayerOpen, setIsPlayerOpen] = useState(false);
   const [plan, setPlan] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const getUserPlan = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    console.log("Document snapshot:", docSnap);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(" data:  " + data);
      return data.plan;
    } else {
      console.log("No user found");
    }
  };

  useEffect(() => {
  const fetchPlan = async () => {
    if (!user) return;

    const userPlan = await getUserPlan(user.uid);
    setPlan(userPlan);
  };

  fetchPlan();
}, [user]);


  return (
    <div className={styles.container}>
      <VerticalNavBar isOpen={isSidebarOpen} closeSidebar={closeSidebar} isPlayerOpen={isPlayerOpen}/>
      <NavBar  isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      {user ? (
        <div className={styles.section}>
          <h1 className={styles.settingsTitle}>Settings</h1>
          <div className={styles.horizontallyDivider}></div>
          <h2 className={styles.settingsSubTitle}>Your Subscription plan</h2>
          <p>{plan}</p>
          <Link href="/choose-plan#plans">
            <button className={styles.upgradeButton}>Upgrade to Premium</button>
          </Link>
          <div className={styles.horizontallyDivider}></div>
          <h2 className={styles.settingsSubTitle}>Email</h2>
          <p>{user?.email}</p>
      </div>

      ):(
        <div className={styles.section}>
          <h1 className={styles.settingsTitle}>Settings</h1>
          <div className={styles.horizontallyDivider}></div>
          <div className={styles.settingsLocked}>
            <img src="/login.png" alt="settings locked" className={styles.settingsLockedImage} />
            <p className={styles.loginToAccess}>Log in to your account to see your details.</p>
            <button className={styles.upgradeButton} onClick={() => setIsModalOpen(true)}>Login</button>
           </div>
          <Login 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
          />
        </div>
        
      )}
    </div>
  )
}
