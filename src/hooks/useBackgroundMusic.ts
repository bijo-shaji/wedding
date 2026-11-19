import { useState, useEffect, useRef, useCallback } from "react";
import { EVENT_CONFIG } from "../config/event";

export interface BackgroundMusicState {
  isPlaying: boolean;
  toggleMusic: () => void;
}

/**
 * Background melody player hook adhering to browser autoplay policies.
 * Unlocks audio on first user touch/click and allows one-click toggle.
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

    const musicUrl = EVENT_CONFIG.features.backgroundMusicUrl || "/audio/wedding-melody.mp3";
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.35; // Gentle, elegant acoustic volume
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Browser policy: audio cannot play until user has made at least one gesture
    const unlockAndPlay = () => {
      if (userMutedRef.current) return;
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Browser still awaiting explicit gesture
          });
      }
    };

    window.addEventListener("pointerdown", unlockAndPlay, { once: true });
    window.addEventListener("keydown", unlockAndPlay, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAndPlay);
      window.removeEventListener("keydown", unlockAndPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      userMutedRef.current = true;
      try {
        sessionStorage.setItem("wedding_music_muted", "true");
      } catch {
        // Fallback
      }
      setIsPlaying(false);
    } else {
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
    }
  }, [isPlaying]);

  return { isPlaying, toggleMusic };
}
