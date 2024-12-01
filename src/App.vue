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
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

main {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
  overflow: hidden;
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