<script setup lang="ts">
import type { Participant } from '../types/participant';

const props = defineProps<{
  participant: Participant;
}>();

const emit = defineEmits<{
  (e: 'updateStatus', status: 'present' | 'absent'): void;
  (e: 'updateMood', mood: 'good' | 'neutral' | 'bad'): void;
}>();
</script>

<template>
  <div class="participant-status">
    <div class="status-buttons">
      <button
        class="status-btn"
        :class="{ active: participant.status === 'present' }"
        @click="emit('updateStatus', 'present')"
      >
        ✓ Présent
      </button>
      <button
        class="status-btn"
        :class="{ active: participant.status === 'absent' }"
        @click="emit('updateStatus', 'absent')"
      >
        ✗ Absent
      </button>
    </div>
    <div class="mood-buttons">
      <button
        class="mood-btn good"
        :class="{ active: participant.mood === 'good' }"
        @click="emit('updateMood', 'good')"
      >
        😊
      </button>
      <button
        class="mood-btn neutral"
        :class="{ active: participant.mood === 'neutral' }"
        @click="emit('updateMood', 'neutral')"
      >
        😐
      </button>
      <button
        class="mood-btn bad"
        :class="{ active: participant.mood === 'bad' }"
        @click="emit('updateMood', 'bad')"
      >
        😟
      </button>
    </div>
  </div>
</template>

<style scoped>
.participant-status {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.status-buttons, .mood-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.status-btn, .mood-btn {
  padding: 8px 16px;
  font-size: 0.9em;
  background-color: #f5f5f7;
  color: #1d1d1f;
}

.status-btn.active {
  background-color: #0071e3;
  color: white;
}

.mood-btn {
  width: 48px;
  height: 48px;
  padding: 8px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}

.mood-btn.good {
  background-color: #f5f5f7;
}

.mood-btn.neutral {
  background-color: #f5f5f7;
}

.mood-btn.bad {
  background-color: #f5f5f7;
}

.mood-btn.active.good {
  background-color: #34c759;
  color: white;
}

.mood-btn.active.neutral {
  background-color: #ffcc00;
  color: white;
}

.mood-btn.active.bad {
  background-color: #ff3b30;
  color: white;
}
</style>