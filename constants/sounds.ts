export interface SoundItem {
  id: string;
  name: string;
  category: string;
  file: number;
  iconBg: string;
  iconColor: string;
}

export const SOUNDS: SoundItem[] = [
  {
    id: 'rain',
    name: 'Gentle Rain',
    category: 'Weather',
    file: require('../assets/sounds/rain.wav'),
    iconBg: '#0e1a14',
    iconColor: '#3db890',
  },
  {
    id: 'white_noise',
    name: 'White Noise',
    category: 'Ambient',
    file: require('../assets/sounds/white_noise.wav'),
    iconBg: '#1a1a14',
    iconColor: '#a09878',
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    category: 'Nature',
    file: require('../assets/sounds/ocean.wav'),
    iconBg: '#0e1420',
    iconColor: '#4a90d8',
  },
  {
    id: 'fireplace',
    name: 'Fireplace',
    category: 'Indoor',
    file: require('../assets/sounds/fireplace.wav'),
    iconBg: '#241008',
    iconColor: '#e07830',
  },
  {
    id: 'forest',
    name: 'Forest Night',
    category: 'Nature',
    file: require('../assets/sounds/forest.wav'),
    iconBg: '#0c180c',
    iconColor: '#5ab060',
  },
  {
    id: 'light_rain',
    name: 'Light Rain',
    category: 'Weather',
    file: require('../assets/sounds/light_rain.wav'),
    iconBg: '#12181e',
    iconColor: '#6aa8d0',
  },
  {
    id: 'night_forest_with_insects',
    name: 'Night Insects',
    category: 'Nature',
    file: require('../assets/sounds/night_forest_with_insects.wav'),
    iconBg: '#0e160e',
    iconColor: '#78b468',
  },
  {
    id: 'rain_thunder_storm',
    name: 'Thunderstorm',
    category: 'Weather',
    file: require('../assets/sounds/rain_thunder_storm.wav'),
    iconBg: '#141018',
    iconColor: '#9080c0',
  },
  {
    id: 'sea_waves',
    name: 'Sea Waves',
    category: 'Nature',
    file: require('../assets/sounds/sea_waves.wav'),
    iconBg: '#0c1620',
    iconColor: '#5898c8',
  },
  {
    id: 'water_flowing_ambience',
    name: 'Flowing Water',
    category: 'Nature',
    file: require('../assets/sounds/water_flowing_ambience.wav'),
    iconBg: '#0e1a1a',
    iconColor: '#48b0a8',
  },
];

export const TIMER_PRESETS = [
  { label: '15 min', minutes: 15 },
  { label: '30 min', minutes: 30 },
  { label: '45 min', minutes: 45 },
  { label: '60 min', minutes: 60 },
  { label: 'Endless', minutes: 0 },
] as const;
