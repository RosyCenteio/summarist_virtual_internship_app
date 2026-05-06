'use client'
import VerticalNavBar from '@/app/component/VerticalNavBar'
import NavBar from '@/app/for-you/NavBar'
import React, { useState } from 'react'
import styles from '../../foryou.module.css';
import { useParams } from 'next/navigation';
import { Book } from '@/app/component/ui/Book';

export default function player() {

   const id = useParams().id;
  
    const [book, setBook] = React.useState<Book | null>(null);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const[isSidebarOpen, setIsSidebarOpen] = useState(false);
    const[isPlayerOpen, setIsPlayerOpen] = useState(true);
    const [fontSize, setFontSize] = useState("medium");

    const toggleSidebar = () => {
      setIsSidebarOpen(prev => !prev);
    };

    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };


    const handlePlayPause = () => {
      if (!audioRef.current) return;

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }

      setIsPlaying(!isPlaying);
    };

    const skip = (seconds: number) => {
      if (!audioRef.current) return;
      audioRef.current.currentTime += seconds;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!audioRef.current) return;

      const value = Number(e.target.value);
      const time = (value / 100) * audioRef.current.duration;

      audioRef.current.currentTime = time;
      setProgress(value);
    };

    const formatTime = (time: number) => {
      if (!time) return "00:00";

      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);

      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
  
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

      const audio = audioRef.current;
      if (!audio) return;

      const update = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);

        const percent =
          (audio.currentTime / audio.duration) * 100;
        setProgress(percent || 0);
      };

      audio.addEventListener("timeupdate", update);

      return () => {
        audio.removeEventListener("timeupdate", update);
      };
    }, []);
  return (
    <div>
        <VerticalNavBar isOpen={isSidebarOpen} closeSidebar={closeSidebar} isPlayerOpen={isPlayerOpen}  setFontSize={setFontSize}/>
        <NavBar  isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
        <div className={styles.container}>
          <div className={styles.bookDetails}>
            <div className={`${styles.summaryContent} ${styles[fontSize]}`}>
              <h1 className={styles.bookPlayerTitle}>{book?.title}</h1> 
              <div className={styles.horizontallyDivider}></div>
              <p className={styles.bookSummary}>{book?.summary}</p>
            </div>
          </div>

          <div className={styles.player}>
            <div className={styles.playerLeft}>
              <img
                src={book?.imageLink}
                alt={book?.title}
                className={styles.playerImage}
              />
              <div>
                <p className={styles.playerTitle}>{book?.title}</p>
                <p className={styles.playerAuthor}>{book?.author}</p>
              </div>
            </div>

            <div className={styles.playerCenter}>
              <button onClick={() => skip(-10)}>⏪</button>

              <button onClick={handlePlayPause} className={styles.playBtn}>
                {isPlaying ? "⏸" : "▶"}
              </button>

              <button onClick={() => skip(10)}>⏩</button>
            </div>

            <div className={styles.playerRight}>
              <span>{formatTime(currentTime)}</span>

              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className={styles.slider}
              />

              <span>{formatTime(duration)}</span>
            </div>

            <audio
              ref={audioRef}
              src={book?.audioLink || "/audio/sample.mp3"}
            />
          </div>
        </div>
  </div>
  )
}
