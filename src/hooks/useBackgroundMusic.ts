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
 * Background melody player hook for romantic wedding piano tune.
 * Defaults to ON so the music starts playing immediately when opening the link
 * or upon the very first touch/click, rewinding to 0:00 on every refresh.
 */
export function useBackgroundMusic(): BackgroundMusicState {
  // Always default to true (ON) unless user has explicitly muted in session
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      return sessionStorage.getItem("wedding_music_muted") !== "true";
    } catch {
      return true;
    }
  });

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

    const musicUrl = EVENT_CONFIG.features.backgroundMusicUrl || "/audio/wedding-melody.mp3";
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
    audio.currentTime = 0; // Always start from the very beginning
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => {
      // Only set isPlaying false if paused due to user action or explicit stop
      if (userMutedRef.current) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // 1. Immediately attempt autoplay on initial page landing
    if (!userMutedRef.current) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If browser policy holds audio pending user gesture,
            // unlock on the first interaction while keeping state ON
          });
      }
    }

    // 2. Unlock immediately on first touch, click, scroll or keypress
    const unlockAndPlay = () => {
      if (userMutedRef.current) return;
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("pointerdown", unlockAndPlay, { passive: true });
    window.addEventListener("touchstart", unlockAndPlay, { passive: true });
    window.addEventListener("click", unlockAndPlay, { passive: true });
    window.addEventListener("scroll", unlockAndPlay, { passive: true });
    window.addEventListener("keydown", unlockAndPlay, { passive: true });

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
        // Will unlock on first user gesture
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
