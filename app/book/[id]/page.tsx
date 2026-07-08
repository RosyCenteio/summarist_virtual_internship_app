'use client'
import React, {useState, useEffect} from 'react'
import {Book} from '../../component/ui/Book'
import { useParams } from 'next/navigation'
import VerticalNavBar from '@/app/component/VerticalNavBar';
import NavBar from '@/app/for-you/NavBar';
import styles from '../../foryou.module.css';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMicrophone, faLightbulb, faBookOpen, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Skeleton from '@/app/component/ui/Skeleton';
import { useAuth } from '../../context/AuthContext';
import Login from '@/app/component/auth/login';
import AudioDuration from '@/app/component/AudioDuration';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase"; 



export default function BookDetails() {
  const id = useParams().id;
  const [book, setBook] = useState<Book | null>(null);
  const[loading, setLoading] = useState(true);
  const[isSidebarOpen, setIsSidebarOpen] = useState(false);
  const[isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plan, setPlan] = useState("");
  
  const toggleSidebar = () => {
      setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
  setIsSidebarOpen(false);
  };

  useEffect(() => {
    if (!id) return;
    const fetchBookDetails = async () => {
      try {
        setLoading(true); 
        const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    }
    fetchBookDetails();
  }, [id]);

  const getUserPlan = async (uid: string) => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      console.log("Document snapshot:", docSnap);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(" data:  " + data);
        
        if (!data || data.plan === undefined) {
        setPlan("Basic");
        return "Basic";
      }
        return data.plan;
      } else {
        setPlan("Basic");
        return "Basic";
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
    <div>
      <VerticalNavBar isOpen={isSidebarOpen} closeSidebar={closeSidebar} isPlayerOpen={isPlayerOpen}/>
      <NavBar  isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
       <div className={styles.container}>
        <div className={styles.bookDetails}>
          {loading? (
            <div className={styles.bookDetailsContent}>
              <Skeleton  width={310} height={160} borderRadius={2}></Skeleton>
              <Skeleton  width={280} height={20} borderRadius={2}></Skeleton>
              <Skeleton  width={310} height={20} borderRadius={2}></Skeleton>
               <div className={styles.horizontallyDivider}></div>
              <Skeleton  width={150} height={100} borderRadius={2}></Skeleton>
              <div className={styles.horizontallyDivider}></div>
              <div className={styles.btn}>
                <Skeleton  width={144} height={48} borderRadius={2}></Skeleton>
                <Skeleton  width={144} height={48} borderRadius={2}></Skeleton>
              </div>
            </div>
            
          )
          :(
            <div className={styles.bookDetailsContent}>
              <h1 className={styles.bookTitle}>{book?.title}</h1> 
              <p className={styles.author}>{book?.author}</p>
              <p className={styles.subtitle}>{book?.subTitle}</p>
              <div className={styles.horizontallyDivider}></div>
              <div className={styles.rating + ' ' + styles.bold}>
                  <FontAwesomeIcon icon={faStar} className={styles.icon} />
                  <p>{book?.averageRating} ({book?.totalRating} ratings)</p>
                  <FontAwesomeIcon icon={faClock} className={styles.icon} />
                  <p><AudioDuration audioLink={book?.audioLink}/></p>  
              </div>
              <div className={styles.rating + ' ' + styles.bold}>
                  <FontAwesomeIcon icon={faMicrophone} className={styles.icon} />
                  <p>Audio & Text</p>
                  <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
                  <p>{book?.keyIdeas} Key ideas</p>  
              </div>
              <div className={styles.horizontallyDivider}></div>
             
             {user ? (

               plan === "premium"  || !(book?.subscriptionRequired) ? (
                 <div className={styles.btn}>
                    <Link href={`/player/${book?.id}`}>
                      <button className={styles.startBtn}>
                        <FontAwesomeIcon icon={faBookOpen} className={styles.icon} />   Read</button>
                    </Link>

                    <Link href={`/player/${book?.id}`}>
                      <button className={styles.startBtn}>
                        <FontAwesomeIcon icon={faMicrophone} className={styles.icon} />  Listen</button>  
                    </Link>
                 </div>
              ) : (

                 <div className={styles.btn}>
                    <Link href={`/choose-plan#plans`}>
                      <button className={styles.startBtn}>
                        <FontAwesomeIcon icon={faBookOpen} className={styles.icon} />   Read</button>
                    </Link>

                    <Link href={`/choose-plan#plans`}>
                      <button className={styles.startBtn}>
                        <FontAwesomeIcon icon={faMicrophone} className={styles.icon} />  Listen</button>  
                    </Link>
                 </div>

              )
             ):(
                <div className={styles.btn}>
                    <button className={styles.startBtn} onClick={() => setIsModalOpen(true)}>
                      <FontAwesomeIcon icon={faBookOpen} className={styles.icon} />   Read</button>
                      <button className={styles.startBtn} onClick={() => setIsModalOpen(true)}>
                        <FontAwesomeIcon icon={faMicrophone} className={styles.icon} />  Listen</button>  
                      <Login 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                    />
                 </div>
                 
             )}
             
          </div>
          )}


          {loading ? (
             <div className={styles.bookImage}>
              <Skeleton  width={200} height={300} borderRadius={2}></Skeleton>
            </div>
          ):(

            <div className={styles.bookImage}>
              <img src={book?.imageLink} alt={book?.title} className={styles.bookCover} />
          </div>
          )}
          
        </div> 
        
        <div className={styles.bookDetails}>
          <div className={styles.bookDetailsContent}>
            <div className={styles.secondTitle}>What's is about</div>
            
            {loading ? (
              <div className={styles.bookDescription}>
                <Skeleton width={80} height={30} borderRadius={20} />
                <Skeleton width={80} height={30} borderRadius={20} />
              </div>
            ) : (
              <div className={styles.bookDescription}>
                <button className={styles.btnTags}>{book?.tags[0]}</button>
                <button className={styles.btnTags}>{book?.tags[1]}</button>
              </div>
            )}
            


            {loading ? (
              <Skeleton width={500} height={80} borderRadius={4} />
            ) : (
              <p className={styles.contentDescription}>
                {book?.bookDescription}
              </p>
            )}

            <div className={styles.secondTitle}>About the author</div>
            {loading ? (
              <Skeleton width={500} height={60} borderRadius={4} />
            ) : (
              <p className={styles.contentDescription}>
                {book?.authorDescription}
              </p>
            )}
          </div>
        </div>
       
      </div> 
      
    </div>
  )
}


