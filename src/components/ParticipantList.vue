<script setup lang="ts">
import type { Participant } from '../types/participant';

defineProps<{
  participants: Participant[];
  selectedId: string | null;
}>();

const emit = defineEmits<{
  (e: 'setSpeaker', participantId: string): void;
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
        <div class="participant-info">
          <label class="speaker-checkbox">
            <input
              type="radio"
              name="speaker"
              :checked="participant.isSpeaker"
              @change="emit('setSpeaker', participant.id)"
            >
            <span class="checkbox-label">Speaker</span>
          </label>
          <span class="participant-name">{{ participant.name }}</span>
        </div>
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

.participant-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.speaker-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9em;
  color: #1d1d1f;
  cursor: pointer;
}

.speaker-checkbox input {
  margin: 0;
  cursor: pointer;
}

.checkbox-label {
  user-select: none;
}

.participant-name {
  flex: 1;
}
</style>