# Vuetiwatch

🎨 A collection of themes for Vuetify 3 with easy plug and play.

## Installation

```sh
  bun add vuetiwatch
  yarn add vuetiwatch
  npm install vuetiwatch
```

## Usage

```typescript
  // plugins/vuetify.ts
  import { createVuetify } from 'vuetify';
  import { vuetiwatchThemes } from 'vuetiwatch';

  export const vuetify = createVuetify({
    theme: {
      defaultTheme: 'classic',
      themes: vuetiwatchThemes,
    },
  })
```

```vue
  <script lang="ts" setup>
    import { useTheme } from 'vuetify';
    const { global: theme } = useTheme();
  </script>

  <template>
    <v-app :theme="theme.name">
      ...
    </v-app>
  </template>
```

## Themes
| Name       | Description                 |
| ---------- |-----------------------------|
| `classic`  | A classic Vuetify theme     |
| `darkGlass`| A dark theme a glass styled |


