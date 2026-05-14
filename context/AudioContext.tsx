import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import type { AudioPlayer } from 'expo-audio';
import { SOUNDS, SoundItem } from '../constants/sounds';
import { useSettings } from './SettingsContext';

interface AudioState {
  currentSound: SoundItem | null;
  isPlaying: boolean;
  volume: number;
  timerMinutes: number;
  timerRemaining: number | null;
  recentlyPlayed: SoundItem[];
}

type AudioAction =
  | { type: 'SET_SOUND'; sound: SoundItem | null }
  | { type: 'SET_PLAYING'; isPlaying: boolean }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'SET_TIMER'; minutes: number }
  | { type: 'TICK_TIMER' }
  | { type: 'CLEAR_TIMER' };

function audioReducer(state: AudioState, action: AudioAction): AudioState {
  switch (action.type) {
    case 'SET_SOUND':
      if (!action.sound) return { ...state, currentSound: null };
      return {
        ...state,
        currentSound: action.sound,
        recentlyPlayed: [
          action.sound,
          ...state.recentlyPlayed.filter((s) => s.id !== action.sound!.id),
        ].slice(0, 10),
      };
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.isPlaying };
    case 'SET_VOLUME':
      return { ...state, volume: action.volume };
    case 'SET_TIMER':
      return {
        ...state,
        timerMinutes: action.minutes,
        timerRemaining: action.minutes > 0 ? action.minutes * 60 : null,
      };
    case 'TICK_TIMER':
      if (state.timerRemaining === null) return state;
      return { ...state, timerRemaining: Math.max(0, state.timerRemaining - 1) };
    case 'CLEAR_TIMER':
      return { ...state, timerRemaining: null, timerMinutes: 0 };
    default:
      return state;
  }
}

interface AudioContextType {
  state: AudioState;
  playSound: (sound: SoundItem) => void;
  togglePlayPause: () => void;
  stopSound: () => void;
  setVolume: (volume: number) => void;
  setTimer: (minutes: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}

const AudioCtx = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, {
    currentSound: null,
    isPlaying: false,
    volume: 0.8,
    timerMinutes: 0,
    timerRemaining: null,
    recentlyPlayed: [],
  });

  const playersRef = useRef<Map<string, AudioPlayer>>(new Map());
  const activeIdRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      shouldRouteThroughEarpiece: false,
    });

    const players = playersRef.current;
    for (const sound of SOUNDS) {
      const player = createAudioPlayer(sound.file);
      player.loop = true;
      player.volume = 0.8;
      players.set(sound.id, player);
    }

    return () => {
      for (const player of players.values()) {
        player.pause();
        player.remove();
      }
      players.clear();
    };
  }, []);

  const stopActive = useCallback(() => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
    if (activeIdRef.current) {
      const player = playersRef.current.get(activeIdRef.current);
      if (player) {
        player.pause();
        player.seekTo(0);
      }
      activeIdRef.current = null;
    }
  }, []);

  const { settings } = useSettings();

  const fadeOutAndStop = useCallback(() => {
    if (!activeIdRef.current) return;
    const player = playersRef.current.get(activeIdRef.current);
    if (!player) return;

    const startVolume = state.volume;
    const totalMs = settings.fadeDuration * 1000;
    const stepDuration = 50;
    const steps = Math.round(totalMs / stepDuration);
    let step = 0;

    fadeRef.current = setInterval(() => {
      step++;
      const newVolume = startVolume * (1 - step / steps);

      if (step >= steps) {
        if (fadeRef.current) clearInterval(fadeRef.current);
        fadeRef.current = null;
        stopActive();
        dispatch({ type: 'SET_PLAYING', isPlaying: false });
        dispatch({ type: 'CLEAR_TIMER' });
        player.volume = startVolume;
        return;
      }

      player.volume = Math.max(0, newVolume);
    }, stepDuration);
  }, [state.volume, settings.fadeDuration, stopActive]);

  useEffect(() => {
    if (state.timerRemaining === null || !state.isPlaying) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      dispatch({ type: 'TICK_TIMER' });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [state.timerRemaining !== null, state.isPlaying]);

  useEffect(() => {
    if (state.timerRemaining === 0 && state.isPlaying) {
      fadeOutAndStop();
    }
  }, [state.timerRemaining, state.isPlaying, fadeOutAndStop]);

  const playSound = useCallback(
    (sound: SoundItem) => {
      stopActive();

      const player = playersRef.current.get(sound.id);
      if (!player) return;

      player.volume = state.volume;
      player.play();
      activeIdRef.current = sound.id;

      dispatch({ type: 'SET_SOUND', sound });
      dispatch({ type: 'SET_PLAYING', isPlaying: true });
    },
    [state.volume, stopActive]
  );

  const togglePlayPause = useCallback(() => {
    if (!activeIdRef.current) return;
    const player = playersRef.current.get(activeIdRef.current);
    if (!player) return;

    if (player.playing) {
      player.pause();
      dispatch({ type: 'SET_PLAYING', isPlaying: false });
    } else {
      player.play();
      dispatch({ type: 'SET_PLAYING', isPlaying: true });
    }
  }, []);

  const stopSound = useCallback(() => {
    stopActive();
    dispatch({ type: 'SET_PLAYING', isPlaying: false });
    dispatch({ type: 'SET_SOUND', sound: null });
    dispatch({ type: 'CLEAR_TIMER' });
  }, [stopActive]);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: 'SET_VOLUME', volume });
    if (activeIdRef.current) {
      const player = playersRef.current.get(activeIdRef.current);
      if (player) player.volume = volume;
    }
  }, []);

  const setTimer = useCallback((minutes: number) => {
    dispatch({ type: 'SET_TIMER', minutes });
  }, []);

  const getAdjacentSound = useCallback(
    (direction: 1 | -1) => {
      if (!state.currentSound) return SOUNDS[0];
      const currentIndex = SOUNDS.findIndex((s) => s.id === state.currentSound!.id);
      const nextIndex = (currentIndex + direction + SOUNDS.length) % SOUNDS.length;
      return SOUNDS[nextIndex];
    },
    [state.currentSound]
  );

  const playNext = useCallback(() => {
    playSound(getAdjacentSound(1));
  }, [getAdjacentSound, playSound]);

  const playPrevious = useCallback(() => {
    playSound(getAdjacentSound(-1));
  }, [getAdjacentSound, playSound]);

  return (
    <AudioCtx.Provider
      value={{
        state,
        playSound,
        togglePlayPause,
        stopSound,
        setVolume,
        setTimer,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioCtx);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
}
