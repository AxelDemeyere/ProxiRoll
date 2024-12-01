<script setup lang="ts">
import type { Participant } from '../types/participant';
import ParticipantStatus from './ParticipantStatus.vue';

const props = defineProps<{
  participant: Participant | null;
}>();

const emit = defineEmits<{
  (e: 'updateStatus', status: 'present' | 'absent'): void;
  (e: 'updateMood', mood: 'good' | 'neutral' | 'bad'): void;
}>();
</script>

<template>
  <div v-if="participant" class="selected-participant">
    <h2>Au tour de</h2>
    <p class="name">{{ participant.name }}</p>
    <ParticipantStatus
      :participant="participant"
      @update-status="emit('updateStatus', $event)"
      @update-mood="emit('updateMood', $event)"
    />
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