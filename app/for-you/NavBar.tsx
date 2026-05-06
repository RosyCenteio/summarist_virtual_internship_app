
"use client";
import React, { useEffect, useState } from 'react'
import styles from '../foryou.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass, faClose
} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from 'next/navigation';



export default function NavBar({ toggleSidebar, isOpen }: { toggleSidebar: () => void; isOpen: boolean }) {

  const[search, setSearch] = useState('');
  const [bookSearched, setBookSearched] = useState([]);
  const router = useRouter();


  const fetchSearchedBooks = async () => {
        try {
            const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`);
            const data = await response.json();
            setBookSearched(data);
        } catch (error) {
            console.error('Error fetching recommended books:', error);
        }  
    }

    const handleSelectBook = (id: string) => {
      setSearch(""); 
      setBookSearched([]);
      router.push(`/book/${id}`); 
    };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() !== "") {
        fetchSearchedBooks();
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
}, [search]);


 

  return (
    <>
       <section id='header' className={styles.content}>
                <header className={styles.header}>
                <div className={styles.searchBar}>
                    <input value={search} type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search for books" />
                    
                    {
                      search.trim() === "" ? (
                        <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                      ) : (
                         <button onClick={() => { setSearch(""); setBookSearched([]);}}><FontAwesomeIcon icon={faClose} /></button>
                      )
                    }
                </div>
                <button onClick={toggleSidebar} className={styles.menuBtn}>
                  {isOpen ? "✕" : "☰"}
                </button>
                </header>
        </section>

        <div className={styles.horizontallyDivider}></div>

        {bookSearched.length > 0 && (
          <div className={styles.searchDropdown}>
            {bookSearched.map((book: any) => (
              <div
                key={book.id}
                className={styles.searchItem}
                onClick={() => handleSelectBook(book.id)}
              >
                <img src={book.imageLink} alt={book.title} />
                <div>
                  <p className={styles.searchTitle}>{book.title}</p>
                  <p className={styles.searchAuthor}>{book.author}</p>
                </div>
              </div>
            ))}
          </div>
  )}
    </>
  )
}
