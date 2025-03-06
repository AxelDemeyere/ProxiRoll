<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";


const route = useRoute();
const currentRoute = computed(() => route.name);
</script>

<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="nav-actions">
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
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: var(--bg-color);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  width: fit-content;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.nav-title {
  font-size: 1.5rem;
  margin: 0;
}

.nav-actions {
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 30px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.nav-links {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 980px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: var(--hover-color);
}

.nav-link.active {
  color: var(--accent-color);
  background-color: var(--secondary-bg);
}
</style>
