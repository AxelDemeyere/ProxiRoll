<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Participant } from '../types/participant';
import { getRandomIndex, generateId } from '../utils/random';
import { useParticipantsStore } from '../stores/participants';
import ParticipantForm from '../components/ParticipantForm.vue';
import ParticipantList from '../components/ParticipantList.vue';
import SelectedParticipant from '../components/SelectedParticipant.vue';
import CompletionMessage from '../components/CompletionMessage.vue';

const { participants } = useParticipantsStore();
const selectedId = ref<string | null>(null);
const completedParticipants = ref<Participant[]>([]);
const hasStarted = ref(false);

const isCompleted = computed(() => {
  return hasStarted.value && participants.value.length === 0 && completedParticipants.value.length > 0;
});

const addParticipant = (name: string) => {
  participants.value.push({
    id: generateId(),
    name
  });
};

const selectRandomParticipant = () => {
  if (!hasStarted.value) {
    hasStarted.value = true;
  }

  if (participants.value.length === 0) {
    selectedId.value = null;
    return;
  }

  const randomIndex = getRandomIndex(participants.value.length);
  const selected = participants.value[randomIndex];
  selectedId.value = selected.id;

  setTimeout(() => {
    completedParticipants.value.push(selected);
    participants.value = participants.value.filter(p => p.id !== selected.id);
    selectedId.value = null;
  }, 2000);
};
</script>

<template>
  <div class="daily-view">
    <div class="content-wrapper">
      <ParticipantForm v-if="!isCompleted" @add-participant="addParticipant" />
      
      <div v-if="participants.length > 0" class="main-content">
        <button 
          @click="selectRandomParticipant"
          :disabled="selectedId !== null"
          class="select-button"
        >
          Tirer au sort
        </button>

        <SelectedParticipant 
          :name="participants.find(p => p.id === selectedId)?.name || null" 
        />
        
        <ParticipantList 
          :participants="participants"
          :selectedId="selectedId"
        />
      </div>

      <CompletionMessage v-if="isCompleted" />

      <div v-if="completedParticipants.length > 0" class="completed-list">
        <h3>Déjà passés</h3>
        <ul>
          <li v-for="participant in completedParticipants" :key="participant.id">
            {{ participant.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.daily-view {
  padding: 1rem 0;
}

.content-wrapper {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 24px;
  padding: 2rem;
  background-color: #ffffff;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.select-button {
  font-size: 1.2em;
  min-width: 200px;
}

.completed-list {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #d2d2d7;
}

.completed-list ul {
  list-style: none;
  padding: 0;
}

.completed-list li {
  padding: 12px 16px;
  color: #86868b;
  background-color: #f5f5f7;
  border-radius: 12px;
  margin: 8px 0;
}
</style>