import React, { useEffect, useRef } from 'react';

/**
 * 6 Ambiance Tracks : 3 MP3s Studio Téléchargés + 3 WAVs Originaux
 */
export const audioTracks = [
  // 1. Les 3 morceaux studio réels téléchargés du web (MP3)
  { 
    id: 'serenade-mp3', 
    title: 'Sérénade Studio (MP3)', 
    subtitle: 'Guitare & Mandoline', 
    genre: 'Sérénade',
    file: '/audio/italian-serenade.mp3' 
  },
  { 
    id: 'jazz-mp3', 
    title: 'Jazz Lounge Studio (MP3)', 
    subtitle: 'Smooth Jazz & Saxophone', 
    genre: 'Jazz',
    file: '/audio/italian-jazz.mp3' 
  },
  { 
    id: 'salsa-mp3', 
    title: 'Salsa Latina Studio (MP3)', 
    subtitle: 'Cuivres & Percussions', 
    genre: 'Salsa',
    file: '/audio/italian-salsa.mp3' 
  },

  // 2. Les 3 compositions acoustiques italiennes (WAV)
  { 
    id: 'serenade-wav', 
    title: 'Mandoline Toscane (WAV)', 
    subtitle: 'Canzone 3/4 & Guitare Nylon', 
    genre: 'Classique',
    file: '/audio/italian-serenade.wav' 
  },
  { 
    id: 'jazz-wav', 
    title: 'Milano Swing Jazz (WAV)', 
    subtitle: 'Contrebasse & Accords Cuivrés', 
    genre: 'Swing',
    file: '/audio/italian-jazz.wav' 
  },
  { 
    id: 'salsa-wav', 
    title: 'Fiesta Mediterranea (WAV)', 
    subtitle: 'Montuno Piano & Tumbao', 
    genre: 'Fiesta',
    file: '/audio/italian-salsa.wav' 
  }
];

/**
 * AudioPlayer — Lecteur 6 Morceaux (3 Téléchargés + 3 Générés)
 * Volume élevé (0.85), fondu sonore doux et navigation fluide.
 */
export default function AudioPlayer({ isPlaying, currentTrackIndex = 0, onTrackEnd }) {
  const audioElRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  const activeTrack = audioTracks[currentTrackIndex] || audioTracks[0];

  // Changement de piste fluide
  useEffect(() => {
    if (!audioElRef.current) {
      const audio = new Audio(activeTrack.file);
      audio.loop = true;
      audio.preload = 'auto';
      audioElRef.current = audio;
    } else {
      const audio = audioElRef.current;
      const wasPlaying = isPlaying && !audio.paused;
      
      audio.src = activeTrack.file;
      audio.currentTime = 0;
      
      if (wasPlaying) {
        audio.volume = 0.85;
        audio.play().catch(() => {});
      }
    }
  }, [currentTrackIndex]);

  // Lecture / pause avec fondu sonore
  useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;

    if (isPlaying) {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      
      audio.volume = 0.15;
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            let vol = 0.15;
            fadeIntervalRef.current = setInterval(() => {
              vol += 0.1;
              if (vol >= 0.85) {
                vol = 0.85;
                clearInterval(fadeIntervalRef.current);
              }
              audio.volume = vol;
            }, 45);
          })
          .catch((err) => {
            console.log('Audio playback notice:', err);
          });
      }
    } else {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      
      let vol = audio.volume;
      fadeIntervalRef.current = setInterval(() => {
        vol -= 0.15;
        if (vol <= 0.05) {
          vol = 0;
          audio.volume = 0;
          audio.pause();
          audio.currentTime = 0;
          clearInterval(fadeIntervalRef.current);
        } else {
          audio.volume = vol;
        }
      }, 35);
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [isPlaying]);

  return null;
}
