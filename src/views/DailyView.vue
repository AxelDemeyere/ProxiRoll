<script setup lang="ts">
import { computed, ref } from 'vue';
import CompletionMessage from '../components/CompletionMessage.vue';
import DailySummary from '../components/DailySummary.vue';
import ParticipantForm from '../components/ParticipantForm.vue';
import ParticipantList from '../components/ParticipantList.vue';
import SelectedParticipant from '../components/SelectedParticipant.vue';
import { useParticipantsStore } from '../stores/participants';
import type { Participant } from '../types/participant';
import { generateId, getRandomIndex } from '../utils/random';

const { participants } = useParticipantsStore();
const selectedId = ref<string | null>(null);
const completedParticipants = ref<Participant[]>([]);
const hasStarted = ref(false);
const speaker = ref<Participant | null>(null);

const selectedParticipant = computed(() => 
  participants.value.find(p => p.id === selectedId.value) || null
);

const isCompleted = computed(() => {
  return hasStarted.value && participants.value.length === 0 && completedParticipants.value.length > 0;
});

const addParticipant = (name: string) => {
  participants.value.push({
    id: generateId(),
    name
  });
};

const setSpeaker = (participantId: string) => {
  // Reset previous speaker if exists
  participants.value.forEach(p => p.isSpeaker = false);
  speaker.value = null;

  const selectedSpeaker = participants.value.find(p => p.id === participantId);
  if (selectedSpeaker && !hasStarted.value) {
    selectedSpeaker.isSpeaker = true;
    speaker.value = selectedSpeaker;
    participants.value = participants.value.filter(p => p.id !== selectedSpeaker.id);
    participants.value.push(selectedSpeaker);
  }
};

const updateParticipantStatus = (status: 'present' | 'absent') => {
  if (selectedId.value) {
    const participant = participants.value.find(p => p.id === selectedId.value);
    if (participant) {
      participant.status = status;
    }
  }
};

const updateParticipantMood = (mood: 'good' | 'neutral' | 'bad') => {
  if (selectedId.value) {
    const participant = participants.value.find(p => p.id === selectedId.value);
    if (participant) {
      participant.mood = mood;
    }
  }
};

const selectRandomParticipant = () => {
  if (!hasStarted.value) {
    if (!speaker.value) {
      return;
    }
    hasStarted.value = true;
  }

  if (participants.value.length === 0) {
    selectedId.value = null;
    return;
  }

  if (participants.value.length > 1 && participants.value[participants.value.length - 1].isSpeaker) {
    const randomIndex = getRandomIndex(participants.value.length - 1);
    selectedId.value = participants.value[randomIndex].id;
  } else {
    const randomIndex = getRandomIndex(participants.value.length);
    selectedId.value = participants.value[randomIndex].id;
  }
};

const nextParticipant = () => {
  if (selectedId.value) {
    const selected = participants.value.find(p => p.id === selectedId.value);
    if (selected) {
      completedParticipants.value.push(selected);
      participants.value = participants.value.filter(p => p.id !== selected.id);
      selectedId.value = null;
    }
  }
};

const stopDaily = () => {
  participants.value = [...participants.value, ...completedParticipants.value];
  completedParticipants.value = [];
  selectedId.value = null;
  hasStarted.value = false;
  speaker.value = null;
  participants.value.forEach(p => p.isSpeaker = false);
};
</script>

<template>
  <div class="daily-view">
    <div class="content-wrapper">
      <div class="header">
        <ParticipantForm v-if="!isCompleted" @add-participant="addParticipant" />
        <button 
          v-if="hasStarted && !isCompleted" 
          @click="stopDaily" 
          class="stop-button"
        >
          Arrêter le daily
        </button>
      </div>
      
      <div class="main-content">
        <div v-if="speaker && !isCompleted" class="speaker-info">
          <h3>Speaker du daily</h3>
          <p>{{ speaker.name }}</p>
        </div>

        <div v-if="participants.length > 0" class="action-content">
          <button 
            v-if="!selectedId"
            @click="selectRandomParticipant"
            class="select-button"
            :disabled="!hasStarted && !speaker"
          >
            {{ !hasStarted ? 'Commencer le daily' : 'Tirer au sort' }}
          </button>

          <button
            v-else
            @click="nextParticipant"
            class="next-button"
          >
            Participant suivant
          </button>

          <SelectedParticipant 
            :participant="selectedParticipant"
            @update-status="updateParticipantStatus"
            @update-mood="updateParticipantMood"
          />
          
          <ParticipantList 
            :participants="participants"
            :selectedId="selectedId"
            @set-speaker="setSpeaker"
          />
        </div>

        <CompletionMessage v-if="isCompleted" />

        <div v-if="completedParticipants.length > 0" class="completed-list">
          <h3>Déjà passés</h3>
          <ul>
            <li 
              v-for="participant in completedParticipants" 
              :key="participant.id"
              :class="{
                'status-present': participant.status === 'present',
                'status-absent': participant.status === 'absent',
                'mood-good': participant.mood === 'good',
                'mood-neutral': participant.mood === 'neutral',
                'mood-bad': participant.mood === 'bad'
              }"
            >
              <span class="participant-name">{{ participant.name }}</span>
              <div class="participant-indicators">
                <span v-if="participant.status === 'present'" class="status-indicator">✓</span>
                <span v-if="participant.status === 'absent'" class="status-indicator">✗</span>
                <span v-if="participant.mood === 'good'" class="mood-indicator">😊</span>
                <span v-if="participant.mood === 'neutral'" class="mood-indicator">😐</span>
                <span v-if="participant.mood === 'bad'" class="mood-indicator">😟</span>
              </div>
            </li>
          </ul>
        </div>

        <DailySummary 
          v-if="isCompleted"
          :participants="completedParticipants"
          :speaker="speaker"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.daily-view {
  padding: 1rem 0;
  width: 90%;
  margin: 0 auto;
}

.content-wrapper {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 24px;
  padding: 2rem;
  margin: 0 auto;
  background-color: #ffffff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.speaker-info {
  background-color: #e8f2ff;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.speaker-info h3 {
  color: #0071e3;
  margin: 0 0 0.5rem 0;
}

.speaker-info p {
  font-size: 1.2em;
  font-weight: 500;
  margin: 0;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.action-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.select-button, .next-button {
  font-size: 1.2em;
  min-width: 200px;
}

.select-button:disabled {
  background-color: #d2d2d7;
  cursor: not-allowed;
}

.next-button {
  background-color: #34c759;
}

.next-button:hover {
  background-color: #32d459;
}

.stop-button {
  background-color: #ff3b30;
  font-size: 0.9em;
  padding: 8px 16px;
}

.stop-button:hover {
  background-color: #ff453a;
}

.completed-list {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #d2d2d7;
}

.completed-list ul {
  list-style: none;
  padding: 0;
}

.completed-list li {
  padding: 12px 16px;
  background-color: #f5f5f7;
  border-radius: 12px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.participant-name {
  color: #1d1d1f;
}

.participant-indicators {
  display: flex;
  gap: 0.5rem;
}

.status-indicator, .mood-indicator {
  font-size: 1.2em;
}

.status-present {
  border-left: 4px solid #34c759;
}

.status-absent {
  border-left: 4px solid #ff3b30;
}

.mood-good {
  background-color: rgba(52, 199, 89, 0.1);
}

.mood-neutral {
  background-color: rgba(255, 204, 0, 0.1);
}

.mood-bad {
  background-color: rgba(255, 59, 48, 0.1);
}
</style>