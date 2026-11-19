import { useState, useEffect, useRef, useCallback } from "react";
import { EVENT_CONFIG } from "../config/event";

export interface BackgroundMusicState {
  isPlaying: boolean;
  toggleMusic: () => void;
  playMusic: () => void;
  pauseMusic: () => void;
  restartMusic: () => void;
}

/**
 * Background melody player hook for Golden Brown (Slowed Tune).
 * Starts playback immediately on the landing envelope screen or first touch/click,
 * and resets to the beginning on every page refresh or intro replay.
 */
export function useBackgroundMusic(): BackgroundMusicState {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!EVENT_CONFIG.features.enableBackgroundMusic) return;

    let isMutedInSession = false;
    try {
      isMutedInSession = sessionStorage.getItem("wedding_music_muted") === "true";
    } catch {
      // Ignore
    }
    userMutedRef.current = isMutedInSession;

    const musicUrl = EVENT_CONFIG.features.backgroundMusicUrl || "/audio/golden-brown.mp3";
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
    audio.currentTime = 0; // Always start from 0:00 on fresh page load
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // 1. Attempt immediate autoplay on initial landing
    if (!userMutedRef.current) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Awaiting user gesture
        });
    }

    // 2. Unlock immediately on the very first touch, pointerdown, click or scroll
    const unlockAndPlay = () => {
      if (userMutedRef.current) return;
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Awaiting explicit user click
          });
      }
    };

    window.addEventListener("pointerdown", unlockAndPlay, { once: true, passive: true });
    window.addEventListener("touchstart", unlockAndPlay, { once: true, passive: true });
    window.addEventListener("click", unlockAndPlay, { once: true, passive: true });
    window.addEventListener("scroll", unlockAndPlay, { once: true, passive: true });
    window.addEventListener("keydown", unlockAndPlay, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAndPlay);
      window.removeEventListener("touchstart", unlockAndPlay);
      window.removeEventListener("click", unlockAndPlay);
      window.removeEventListener("scroll", unlockAndPlay);
      window.removeEventListener("keydown", unlockAndPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    userMutedRef.current = false;
    try {
      sessionStorage.removeItem("wedding_music_muted");
    } catch {
      // Fallback
    }
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn("[BackgroundMusic] Playback error:", err);
      });
  }, []);

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    userMutedRef.current = true;
    try {
      sessionStorage.setItem("wedding_music_muted", "true");
    } catch {
      // Fallback
    }
    setIsPlaying(false);
  }, []);

  const restartMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0; // Rewind to the very beginning
    userMutedRef.current = false;
    try {
      sessionStorage.removeItem("wedding_music_muted");
    } catch {
      // Fallback
    }
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Will be triggered by gesture
      });
  }, []);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }, [isPlaying, pauseMusic, playMusic]);

  return { isPlaying, toggleMusic, playMusic, pauseMusic, restartMusic };
}
