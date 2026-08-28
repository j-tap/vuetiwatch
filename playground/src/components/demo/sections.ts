import type { Component } from 'vue'

import DemoButtons from './DemoButtons.vue'
import DemoCards from './DemoCards.vue'
import DemoDialog from './DemoDialog.vue'
import DemoExtras from './DemoExtras.vue'
import DemoFeedback from './DemoFeedback.vue'
import DemoForm from './DemoForm.vue'
import DemoNavbars from './DemoNavbars.vue'
import DemoNavigation from './DemoNavigation.vue'
import DemoTable from './DemoTable.vue'
import DemoTypography from './DemoTypography.vue'

export interface DemoSection {
  /** Anchor target, and the value the drawer highlights while it is in view. */
  id: string
  title: string
  subtitle: string
  icon: string
  component: Component
  /** Columns at `lg` and up. Blocks take the whole row unless they are short. */
  span?: number
}

/** Single source for the page order, the anchors and the drawer's contents. */
export const demoSections: DemoSection[] = [
  {
    id: 'typography',
    title: 'Typography',
    subtitle: 'Heading and body scales, quotes, inline code',
    icon: 'mdi-format-size',
    component: DemoTypography,
  },
  {
    id: 'navbars',
    title: 'Navbars',
    subtitle: 'Toolbars across the palette, with menus and actions',
    icon: 'mdi-page-layout-header',
    component: DemoNavbars,
  },
  {
    id: 'buttons',
    title: 'Buttons',
    subtitle: 'Every variant against every theme colour',
    icon: 'mdi-gesture-tap-button',
    component: DemoButtons,
  },
  {
    id: 'cards',
    title: 'Cards',
    subtitle: 'Surface treatment, radius and elevation in one place',
    icon: 'mdi-card-multiple-outline',
    component: DemoCards,
  },
  {
    id: 'navigation',
    title: 'Navigation & data display',
    subtitle: 'Tabs, lists, chips, avatars and a timeline',
    icon: 'mdi-compass-outline',
    component: DemoNavigation,
  },
  {
    id: 'form',
    title: 'Form elements',
    subtitle: 'Fields, selection controls and validation states',
    icon: 'mdi-form-select',
    component: DemoForm,
  },
  {
    id: 'dialog',
    title: 'Dialog',
    subtitle: 'A surface raised above the page',
    icon: 'mdi-dock-window',
    component: DemoDialog,
    span: 4,
  },
  {
    id: 'feedback',
    title: 'Feedback',
    subtitle: 'Alerts, progress, ratings and a snackbar',
    icon: 'mdi-bell-outline',
    component: DemoFeedback,
    span: 8,
  },
  {
    id: 'table',
    title: 'Tables & disclosure',
    subtitle: 'Data table, breadcrumbs, pagination and panels',
    icon: 'mdi-table',
    component: DemoTable,
  },
  {
    id: 'extras',
    title: 'Less travelled',
    subtitle: 'Sheets, steppers, pickers — what a theme forgets to cover',
    icon: 'mdi-shape-outline',
    component: DemoExtras,
  },
]
