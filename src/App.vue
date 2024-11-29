<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="app-container">
    <NavBar />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.app-container {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
}

main {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>