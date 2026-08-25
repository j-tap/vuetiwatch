import type { ThemeDefinition } from 'vuetify'
import type { VuetiwatchDefaults, VuetiwatchMeta, VuetiwatchTheme } from '../types.js'
import { mergeDeep } from './merge.js'

/**
 * Vuetify does not merge a custom theme with its built-in `light` / `dark`
 * theme — every key a theme omits is simply missing at runtime. These two
 * bases mirror Vuetify 4's stock definitions so a theme file only has to
 * state what it actually changes.
 */
const base: Record<'light' | 'dark', ThemeDefinition> = {
  light: {
    dark: false,
    colors: {
      background: '#FFFFFF',
      surface: '#FFFFFF',
      'surface-bright': '#FFFFFF',
      'surface-light': '#EEEEEE',
      'surface-variant': '#424242',
      'on-surface-variant': '#EEEEEE',
      primary: '#1867C0',
      'primary-darken-1': '#1F5592',
      secondary: '#48A9A6',
      'secondary-darken-1': '#018786',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    },
    variables: {
      'border-color': '#000000',
      'border-opacity': 0.12,
      'shadow-color': '#000000',
      'high-emphasis-opacity': 0.87,
      'medium-emphasis-opacity': 0.6,
      'disabled-opacity': 0.38,
      'idle-opacity': 0.04,
      'hover-opacity': 0.04,
      'focus-opacity': 0.12,
      'selected-opacity': 0.08,
      'activated-opacity': 0.12,
      'pressed-opacity': 0.12,
      'dragged-opacity': 0.08,
      'theme-kbd': '#EEEEEE',
      'theme-on-kbd': '#000000',
      'theme-code': '#F5F5F5',
      'theme-on-code': '#000000',
      'theme-on-dark': '#FFF',
      'theme-on-light': '#000',
      'elevation-overlay-color': 'black',
      'elevation-overlay-opacity-step': '2%',
      'highlight-opacity': '8%',
    },
  },
  dark: {
    dark: true,
    colors: {
      background: '#121212',
      surface: '#212121',
      'surface-bright': '#ccbfd6',
      'surface-light': '#424242',
      'surface-variant': '#c8c8c8',
      'on-surface-variant': '#000000',
      primary: '#2196F3',
      'primary-darken-1': '#277CC1',
      secondary: '#54B6B2',
      'secondary-darken-1': '#48A9A6',
      error: '#CF6679',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    },
    variables: {
      'border-color': '#FFFFFF',
      'border-opacity': 0.12,
      'shadow-color': '#000000',
      'high-emphasis-opacity': 1,
      'medium-emphasis-opacity': 0.7,
      'disabled-opacity': 0.5,
      'idle-opacity': 0.1,
      'hover-opacity': 0.04,
      'focus-opacity': 0.12,
      'selected-opacity': 0.08,
      'activated-opacity': 0.12,
      'pressed-opacity': 0.16,
      'dragged-opacity': 0.08,
      'theme-kbd': '#424242',
      'theme-on-kbd': '#FFFFFF',
      'theme-code': '#343434',
      'theme-on-code': '#CCCCCC',
      'theme-on-dark': '#FFF',
      'theme-on-light': '#000',
      'elevation-overlay-color': 'white',
      'elevation-overlay-opacity-step': '2%',
      'highlight-opacity': '20%',
    },
  },
}

/**
 * Applied under every theme's own defaults.
 *
 * A slider with no `color` falls back to `surface-variant`, which reads as
 * dead grey whatever the palette — so the controls whose whole job is to
 * show a value are coloured here once. A theme overrides this the way it
 * overrides anything else.
 */
const baseDefaults: VuetiwatchDefaults = {
  VSlider: { color: 'primary' },
  VRangeSlider: { color: 'primary' },
}

export interface DefineThemeOptions<Name extends string = string> {
  name: Name
  meta: VuetiwatchMeta
  theme: ThemeDefinition
  defaults?: VuetiwatchDefaults
}

export function defineTheme<const Name extends string> (
  options: DefineThemeOptions<Name>,
): VuetiwatchTheme<Name> {
  return {
    name: options.name,
    meta: options.meta,
    theme: mergeDeep(base[options.theme.dark ? 'dark' : 'light'], options.theme),
    defaults: mergeDeep(baseDefaults as Record<string, any>, options.defaults) as VuetiwatchDefaults,
  }
}
