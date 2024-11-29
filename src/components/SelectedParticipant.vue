<script setup lang="ts">
defineProps<{
  name: string | null;
}>();
</script>

<template>
  <div v-if="name" class="selected-participant">
    <h2>Au tour de</h2>
    <p class="name">{{ name }}</p>
  </div>
</template>

<style scoped>
.selected-participant {
  margin: 2rem 0;
  padding: 2rem;
  background-color: #f5f5f7;
  border-radius: 20px;
  text-align: center;
}

.name {
  font-size: 2.5em;
  color: #0071e3;
  margin: 1rem 0;
  font-weight: 600;
  letter-spacing: -0.02em;
}
</style>