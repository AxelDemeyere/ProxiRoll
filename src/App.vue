<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Tirage</RouterLink>
      <RouterLink to="/participants">Participants</RouterLink>
      <RouterLink to="/lists">Listes</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
:root {
  /* Couleurs */
  --primary-color: #007AFF;
  --secondary-color: #5856D6;
  --success-color: #34C759;
  --danger-color: #FF3B30;
  --warning-color: #FF9500;
  --background-color: #F5F5F7;
  --surface-color: #FFFFFF;
  --text-primary: #1D1D1F;
  --text-secondary: #86868B;
  --border-color: rgba(0, 0, 0, 0.1);

  /* Ombres */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.02);

  /* Rayons de bordure */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;

  /* Transitions */
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--background-color);
  color: var(--text-primary);
  line-height: 1.5;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  gap: 2rem;
  align-items: center;
}

nav a {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  transition: var(--transition-fast);
}

nav a:hover {
  color: var(--primary-color);
  background-color: rgba(0, 122, 255, 0.1);
}

nav a.router-link-active {
  color: var(--primary-color);
  background-color: rgba(0, 122, 255, 0.1);
}

.card {
  background-color: var(--surface-color);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  transition: background-color var(--transition-fast);
}

.button:active {
  transform: scale(0.98);
}

.button-primary {
  background-color: var(--primary-color);
  color: white;
  box-shadow: var(--shadow-xs);
}

.button-primary:hover {
  background-color: #0066CC;
  box-shadow: var(--shadow-sm);
}

.button-primary:active::after {
  background-color: rgba(0, 0, 0, 0.1);
}

.button-secondary {
  background-color: rgba(0, 122, 255, 0.1);
  color: var(--primary-color);
}

.button-secondary:hover {
  background-color: rgba(0, 122, 255, 0.15);
}

.button-secondary:active::after {
  background-color: rgba(0, 0, 0, 0.05);
}

.button-danger {
  background-color: var(--danger-color);
  color: white;
  box-shadow: var(--shadow-xs);
}

.button-danger:hover {
  background-color: #FF2D55;
  box-shadow: var(--shadow-sm);
}

.button-danger:active::after {
  background-color: rgba(0, 0, 0, 0.1);
}

.input {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background-color: var(--surface-color);
  font-size: 1rem;
  transition: all var(--transition-fast);
  width: 100%;
  color: var(--text-primary);
}

.input:hover {
  border-color: rgba(0, 0, 0, 0.2);
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  nav {
    padding: 0.75rem;
    gap: 1rem;
  }

  nav a {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }

  .button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active {
  animation: fadeIn 0.3s ease-out;
}
</style>