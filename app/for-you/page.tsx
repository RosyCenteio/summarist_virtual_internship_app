"use client";
import React, { useEffect, useState } from 'react'
import VerticalNavBar from '../component/VerticalNavBar'
import styles from '../foryou.module.css'
import Skeleton from '../component/ui/Skeleton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from './NavBar';

import {
  faStar,
  faClock,
  faPlay
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import {Book} from '../component/ui/Book'
import AudioDuration from '../component/AudioDuration';


export default function ForYou() {
    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
    const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
    const[selectedBook, setSelectedBook] = useState<Book | null>(null);
    const[loading, setLoading] = useState(true);
    const[isSidebarOpen, setIsSidebarOpen] = useState(false);
    const[isPlayerOpen, setIsPlayerOpen] = useState(false);
    const[isFormatDuration, setIsFormatDuration] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const closeSidebar = () => {
    setIsSidebarOpen(false);
    };

    const fetchRecommendedBooks = async () => {
        try {
            const response = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended');
            const data = await response.json();
            setRecommendedBooks(data);
        } catch (error) {
            console.error('Error fetching recommended books:', error);
        }  
    }

    const fetchSuggestedBooks = async () => {
        try {
            const response = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested');
            const data = await response.json();
            setSuggestedBooks(data);
        } catch (error) {
            console.error('Error fetching suggested books:', error);
        }  
    }

    const fetchSelectedBook = async () => {
        try {
            const response = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected');
            const data = await response.json();
            setSelectedBook(data[0]);
        } catch (error) {
            console.error('Error fetching selected book:', error);
        }  
    }

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            await Promise.all([
                fetchRecommendedBooks(),
                fetchSuggestedBooks(),
                fetchSelectedBook()
            ]);
            setLoading(false);
        };
        fetchAll();
    }, []);


  return (
    <div className={styles.layout}>
        <div className={styles.container}>
            <VerticalNavBar isOpen={isSidebarOpen} closeSidebar={closeSidebar} isPlayerOpen={isPlayerOpen} />
            <div className={styles.main}>
                <NavBar  isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
                <div className={styles.row}>
                    <section className={styles.sectionSelectedForYou}> 
                        <h2 className={styles.sectionTitle}>Selected For You</h2>
                        {loading ? (
                            <Skeleton width={620} height={230} borderRadius={2} />
                        ) : (
                        <Link href={`/book/${selectedBook?.id}`}> 
                            <div className={styles.selectedBook}>
                                <p className={styles.selectedSubtitle}>{selectedBook?.subTitle}</p>
                                <div className={styles.divider}></div>
                                
                                <div className={styles.selectedContent}>
                                    <img src={selectedBook?.imageLink} alt={selectedBook?.title} className={styles.selectedImage} />
                                    <div className={styles.selectedText}>
                                        <h3>{selectedBook?.title}</h3>
                                        <p>{selectedBook?.author}</p>
                                        <div className={styles.playBook}>
                                            <FontAwesomeIcon icon={faPlay} className={styles.playerIcon} />
                                            {selectedBook && 
                                                <AudioDuration audioLink={selectedBook?.audioLink}  isFormatDuration={isFormatDuration}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        )}
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Recommended For You</h2>
                        <p className={styles.subtitle}>We think you'll like these</p>

                        {loading ? (
                            <div className={styles.bookGrid}>
                                {[1, 2, 3, 4].map((index) => (
                                <div key={index} className={styles.bookItem}>
                                        <Skeleton width={172} height={200} borderRadius={2} />
                                        <Skeleton width={172} height={16} borderRadius={2} />
                                        <Skeleton width={155} height={16} borderRadius={2} />
                                        <Skeleton width={172} height={16} borderRadius={2} />
                                </div>
                                ))}
                            </div>             
                        )                 
                        :(
                            
                        <div className={styles.bookGrid}>
                            {recommendedBooks.map((book: any) => (
                                <Link href={`/book/${book.id}`} key={book.id} className={styles.link}>
                                    <div className={styles.bookItem}>
                                        {book.subscriptionRequired && (
                                            <button className={styles.subscriptionBtn}>Premium</button>
                                        )}
                                        <img src={book.imageLink} alt={book.title} />
                                        <h3>{book.title}</h3>
                                        <p>{book.author}</p>
                                        <p className={styles.book__subtitle}>{book.subTitle}</p>
                                        <div className={styles.rating}>
                                            <FontAwesomeIcon icon={faClock} className={styles.icon} />
                                            <p><AudioDuration audioLink={book.audioLink}  /></p>
                                            <FontAwesomeIcon icon={faStar} className={styles.icon} />
                                            <p>{book.averageRating}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>                 
                        )}
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Suggested Books</h2>
                        <p className={styles.subtitle}>Browse those books</p>
                        
                        {loading ? (
                            <div className={styles.bookGrid}>
                                {[1, 2, 3, 4].map((index) => (
                                    <div key={index} className={styles.bookItem}>
                                        <Skeleton width={172} height={200} borderRadius={2} />
                                        <Skeleton width={172} height={16} borderRadius={2} />
                                        <Skeleton width={155} height={16} borderRadius={2} />
                                        <Skeleton width={172} height={16} borderRadius={2} />
                                </div>
                                ))}
                            </div>
                        ) : (
                            
                            <div className={styles.bookGrid}>
                                {suggestedBooks.map((book: any) => (
                                    <Link href={`/book/${book.id}`}  key={book.id}>
                                        <div className={styles.bookItem}>
                                            {book.subscriptionRequired && (
                                                <button className={styles.subscriptionBtn}>Premium</button>
                                            )}
                                            <img src={book.imageLink} alt={book.title} />
                                            <h3>{book.title}</h3>
                                            <p>{book.author}</p>
                                            <p className={styles.book__subtitle}>{book.subTitle}</p>
                                            <div className={styles.rating}>
                                                <FontAwesomeIcon icon={faClock} className={styles.icon} />
                                                <p><AudioDuration audioLink={book.audioLink}  /></p>
                                                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                                                <p>{book.averageRating}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                        
                    </section>
                </div>
            </div>
        </div>
    </div>               
  )
}
