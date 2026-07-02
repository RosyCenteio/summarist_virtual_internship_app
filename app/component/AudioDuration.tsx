import React, { useEffect, useRef, useState } from "react";

export default function AudioDuration({ audioLink, isFormatDuration }: { audioLink?: string, isFormatDuration?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);

  const formatTime = (time: number) => {
    if (!time) return "00:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const formatDuration = (duration: string) => {
    const [minutes, seconds] = duration.split(":");
    return `${minutes} mins ${seconds} secs`;
 };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioLink) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioLink]);

  return (
    <>
        {isFormatDuration ? <span>{formatDuration(formatTime(duration))}</span> : <span>{formatTime(duration)}</span>}
      <audio ref={audioRef} src={audioLink} preload="metadata" />
    </>
  );
}