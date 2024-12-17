<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header>
    <div class="header-container">
      <div class="logo">ProxiRoll</div>
      <div class="burger-menu" @click="toggleMenu">
        <div class="burger-icon" :class="{ 'open': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav :class="{ 'menu-open': isMenuOpen }">
        <RouterLink to="/" @click="closeMenu">Tirage</RouterLink>
        <RouterLink to="/participants" @click="closeMenu">Participants</RouterLink>
        <RouterLink to="/lists" @click="closeMenu">Listes</RouterLink>
      </nav>
    </div>
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
}

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  background-color: var(--background-color);
  color: var(--text-primary);
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  background-color: var(--surface-color);
  box-shadow: var(--shadow-xs);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
}

.burger-menu {
  display: none;
  cursor: pointer;
}

.burger-icon {
  width: 30px;
  height: 20px;
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;
}

.burger-icon span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: var(--text-primary);
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
}

.burger-icon span:nth-child(1) {
  top: 0px;
}

.burger-icon span:nth-child(2) {
  top: 10px;
}

.burger-icon span:nth-child(3) {
  top: 20px;
}

.burger-icon.open span:nth-child(1) {
  top: 10px;
  transform: rotate(135deg);
}

.burger-icon.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.burger-icon.open span:nth-child(3) {
  top: 10px;
  transform: rotate(-135deg);
}

nav {
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
  .burger-menu {
    display: block;
  }

  nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--surface-color);
    box-shadow: var(--shadow-md);
    flex-direction: column;
    align-items: center;
  }

  nav.menu-open {
    height: fit-content;
    display: flex;
  }

  nav a {
    width: 100%;
    text-align: center;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    margin: 0;
  }

  nav a:last-child {
    border-bottom: none;
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