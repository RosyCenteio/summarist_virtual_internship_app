'use client'
import React from 'react'
import {Book} from '../../component/ui/Book'
import { useParams } from 'next/navigation'
import VerticalNavBar from '@/app/component/VerticalNavBar';
import NavBar from '@/app/for-you/NavBar';
import styles from '../../foryou.module.css';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMicrophone, faLightbulb, faBookOpen } from '@fortawesome/free-solid-svg-icons';

export default function BookDetails() {
  const id = useParams().id;

  const [book, setBook] = React.useState<Book | null>(null);

  React.useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    }
    fetchBookDetails();
  }, []);
  
  return (
    <div>
      <VerticalNavBar />
      <NavBar />
       <div className={styles.container}>
        <div className={styles.bookDetails}>
          <div className={styles.bookDetailsContent}>
            <h1 className={styles.bookTitle}>{book?.title}</h1> 
            <p>{book?.author}</p>
            <p>{book?.subTitle}</p>
            <div className={styles.horizontallyDivider}></div>
            <div className={styles.rating}>
                <FontAwesomeIcon icon={faStar} className={styles.icon} />
                <p>{book?.averageRating} ({book?.totalRating})</p>
                <FontAwesomeIcon icon={faClock} className={styles.icon} />
                <p>04:54</p>  
            </div>
            <div className={styles.rating}>
                <FontAwesomeIcon icon={faMicrophone} className={styles.icon} />
                <p>Audio & Text</p>
                <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
                <p>{book?.keyIdeas}</p>  
            </div>
            <div className={styles.horizontallyDivider}></div>
            <div className={styles.btn}>
                <button className={styles.startBtn}>
                  <FontAwesomeIcon icon={faBookOpen} className={styles.icon} />   Read</button>
                <button className={styles.startBtn}>
                  <FontAwesomeIcon icon={faMicrophone} className={styles.icon} />  Listen</button>  
            </div>

          </div>
          <div className={styles.bookImage}>
            <img src={book?.imageLink} alt={book?.title} className={styles.bookCover} />
          </div>
        </div> 
      </div> 
      
    </div>
  )
}
