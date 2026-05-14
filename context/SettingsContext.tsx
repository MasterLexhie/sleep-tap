import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'sleeptap_settings';

interface Settings {
  defaultVolume: number;
  fadeDuration: number;
  defaultTimerMinutes: number;
  endlessByDefault: boolean;
}

const DEFAULTS: Settings = {
  defaultVolume: 0.65,
  fadeDuration: 3,
  defaultTimerMinutes: 30,
  endlessByDefault: false,
};

interface SettingsContextType {
  settings: Settings;
  update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const SettingsCtx = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(data) }));
      }
    });
  }, []);

  const update = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <SettingsCtx.Provider value={{ settings, update }}>
      {children}
    </SettingsCtx.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsCtx);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}
