<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentRoute = computed(() => route.name);
</script>

<template>
  <nav class="navbar">
    <div class="nav-content">
      <h1 class="nav-title">Daily Random</h1>
      <div class="nav-links">
        <router-link 
          to="/" 
          class="nav-link"
          :class="{ active: currentRoute === 'daily' }"
        >
          Tirage au sort
        </router-link>
        <router-link 
          to="/lists" 
          class="nav-link"
          :class="{ active: currentRoute === 'lists' }"
        >
          Listes
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-title {
  font-size: 1.5rem;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #1d1d1f;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 980px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #f5f5f7;
}

.nav-link.active {
  color: #0071e3;
  background-color: #e8f2ff;
}
</style>