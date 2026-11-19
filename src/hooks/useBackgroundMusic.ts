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
 * Background melody player hook for romantic wedding piano & cello tune.
 * Reuses the preloaded audio element from index.html for zero latency / zero lag.
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

    // Connect to preloaded audio in index.html for instant 0-second start
    const existingAudio = document.getElementById("wedding-audio") as HTMLAudioElement | null;
    const musicUrl = EVENT_CONFIG.features.backgroundMusicUrl || "/audio/wedding-melody.mp3";
    const audio = existingAudio || new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => {
      if (userMutedRef.current) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // If audio is already playing from the preloader, sync state
    if (!audio.paused) {
      setIsPlaying(true);
    } else if (!userMutedRef.current) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Unlocks on first gesture
          });
      }
    }

    // Instant unlock on first touch, click, scroll or keypress
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
      .catch(() => {});
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
