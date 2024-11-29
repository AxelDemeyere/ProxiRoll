<script setup lang="ts">
import { ref, onMounted } from 'vue';

const visible = ref(false);

onMounted(() => {
  visible.value = true;
});
</script>

<template>
  <div class="completion-message" :class="{ visible }">
    <h2>🎉 Daily terminé !</h2>
    <p class="message">Bonne journée !</p>
  </div>
</template>

<style scoped>
.completion-message {
  margin: 2rem 0;
  padding: 3rem 2rem;
  background-color: #f5f5f7;
  border-radius: 20px;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.completion-message.visible {
  opacity: 1;
  transform: translateY(0);
}

.message {
  font-size: 2em;
  margin: 1.5rem 0;
  font-weight: 600;
  color: #0071e3;
  letter-spacing: -0.02em;
}
</style>