import type { ThemeDefinition } from 'vuetify'

const darkGlass: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#1e1e1e',
    primary: '#441d88',
    secondary: '#4a90e2',
    success: '#00e676',
    info: '#4fc3f7',
    warning: '#fbc02d',
    error: '#ef5350',

    'on-primary': '#ffffff',
    'on-secondary': '#ffffff',
    'on-surface': '#eeeeee',
    'on-background': '#f5f5f5',
  },
  variables: {
    'border-radius-root': '10px',
    'overlay-opacity': 0.12,
    'high-emphasis-opacity': 0.95,
    'medium-emphasis-opacity': 0.75,
    'low-emphasis-opacity': 0.5,
  },
}

export default darkGlass
