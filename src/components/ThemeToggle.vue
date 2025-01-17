<script setup lang="ts">
import { useThemeStore } from '../stores/theme';

const { isDark, toggleTheme } = useThemeStore();
</script>

<template>
  <button class="theme-toggle" @click="toggleTheme" disabled>
    <span v-if="isDark">☀️</span>
    <span v-else>🌙</span>
  </button>
</template>

<style scoped>
.theme-toggle {

  background: none;
  border: none;
  padding: 8px;
  font-size: 1.2em;
  cursor: pointer;
  color: var(--text-color);
  min-width: auto;
}

.theme-toggle:hover {
  background: var(--hover-color);
  cursor: not-allowed;
}
</style>