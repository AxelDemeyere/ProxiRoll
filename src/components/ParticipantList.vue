<script setup lang="ts">
import type { Participant } from '../types/participant';

defineProps<{
  participants: Participant[];
  selectedId: string | null;
}>();
</script>

<template>
  <div class="participant-list">
    <h3>Participants restants</h3>
    <ul>
      <li
        v-for="participant in participants"
        :key="participant.id"
        :class="{ 'selected': participant.id === selectedId }"
      >
        {{ participant.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.participant-list {
  margin: 2rem 0;
  text-align: left;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

li {
  padding: 12px 16px;
  border-radius: 12px;
  margin: 8px 0;
  background-color: #f5f5f7;
  transition: all 0.2s ease;
}

.selected {
  background-color: #e8f2ff;
  color: #0071e3;
  font-weight: 500;
}
</style>