import { useState, useEffect, useRef, useCallback } from "react";
import { EVENT_CONFIG } from "../config/event";

export interface BackgroundMusicState {
  isPlaying: boolean;
  toggleMusic: () => void;
  playMusic: () => void;
  pauseMusic: () => void;
}

/**
 * Background melody player hook adhering to browser autoplay policies.
 * Starts playback immediately on initial landing or on the first user interaction.
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
      // Ignore in restricted environments
    }
    userMutedRef.current = isMutedInSession;

    const musicUrl = EVENT_CONFIG.features.backgroundMusicUrl || "/audio/golden-brown.mp3";
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";
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
          // Browser requires user gesture before allowing audio playback
        });
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
          .catch(() => {
            // Still waiting for gesture
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
        console.warn("[BackgroundMusic] Playback prevented:", err);
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

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }, [isPlaying, pauseMusic, playMusic]);

  return { isPlaying, toggleMusic, playMusic, pauseMusic };
}
