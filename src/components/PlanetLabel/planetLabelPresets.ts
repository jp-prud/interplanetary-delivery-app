import { ThemeColors } from '@theme';

interface PlanetLabelUI {
  container: ThemeColors;
  content: ThemeColors;
  icon: string;
  label: 'Earth' | 'Mars';
}

export const planetLabelPresets: Record<string, PlanetLabelUI> = {
  earth: {
    container: 'primaryLight',
    content: 'text',
    icon: '🌍',
    label: 'Earth',
  },
  mars: {
    container: 'secondary',
    content: 'text',
    icon: '🪐',
    label: 'Mars',
  },
};
