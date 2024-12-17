<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import DailySummary from "../components/DailySummary.vue";
import ParticipantForm from "../components/ParticipantForm.vue";
import ParticipantList from "../components/ParticipantList.vue";
import SelectedParticipant from "../components/SelectedParticipant.vue";
import { useParticipantsStore } from "../stores/participants";
import type { Participant } from "../types/participant";
import { generateId } from "../utils/random";

const { participants } = useParticipantsStore();
const selectedId = ref<string | null>(null);
const completedParticipants = ref<Participant[]>([]);
const hasStarted = ref(false);
const speaker = ref<Participant | null>(null);
const showSummary = ref(false);

const dailyProgress = computed(() => {
  const total = participants.value.length + completedParticipants.value.length;
  const completed = completedParticipants.value.length;
  return total > 0 ? (completed / total) * 100 : 0;
});

const selectedParticipant = computed(
  () => participants.value.find((p) => p._id === selectedId.value) || null
);

const isCompleted = computed(() => {
  return (
    participants.value.length === 0 && completedParticipants.value.length > 0
  );
});

watch(isCompleted, (newValue) => {
  if (newValue) {
    showSummary.value = true;
  }
});

const addParticipant = (name: string) => {
  participants.value.push({
    _id: generateId(),
    name,
  });
};

const setSpeaker = (participantId: string) => {
  // Si tous les participants ont été traités, on ne peut plus modifier le speaker
  if (participants.value.length === 0) {
    return;
  }

  // Reset previous speaker if exists
  participants.value.forEach((p) => (p.isSpeaker = false));
  speaker.value = null;

  const selectedSpeaker = participants.value.find(
    (p) => p._id === participantId
  );
  if (selectedSpeaker && !hasStarted.value) {
    selectedSpeaker.isSpeaker = true;
    speaker.value = selectedSpeaker;
    participants.value = participants.value.filter(
      (p) => p._id !== selectedSpeaker._id
    );
    participants.value.push(selectedSpeaker);
  }
};

const updateParticipantStatus = (status: "present" | "absent") => {
  if (selectedId.value) {
    const participant = participants.value.find(
      (p) => p._id === selectedId.value
    );
    if (participant) {
      participant.status = status;
    }
  }
};

const updateParticipantMood = (mood: "good" | "neutral" | "bad") => {
  if (selectedId.value) {
    const participant = participants.value.find(
      (p) => p._id === selectedId.value
    );
    if (participant) {
      participant.mood = mood;
    }
  }
};

const selectRandomParticipant = () => {
  if (participants.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * participants.value.length);
    const randomParticipant = participants.value[randomIndex];

    // Désélectionner le précédent speaker
    if (speaker.value) {
      speaker.value.isSpeaker = false;
    }

    // Sélectionner le nouveau participant
    selectedId.value = randomParticipant._id;
    speaker.value = randomParticipant;
    randomParticipant.isSpeaker = true;

    // S'assurer que le daily a commencé
    hasStarted.value = true;
  }
};

const nextParticipant = () => {
  if (selectedId.value) {
    const selected = participants.value.find((p) => p._id === selectedId.value);
    if (selected) {
      completedParticipants.value.push(selected);
      participants.value = participants.value.filter(
        (p) => p._id !== selected._id
      );

      // Si plus de participants, terminer automatiquement
      if (participants.value.length === 0) {
        hasStarted.value = false;
        speaker.value = null;
      } else {
        // Sélectionner automatiquement le prochain participant
        selectRandomParticipant();
      }
    }
  }
};

const stopDaily = () => {
  participants.value = [...participants.value, ...completedParticipants.value];
  completedParticipants.value = [];
  selectedId.value = null;
  hasStarted.value = false;
  speaker.value = null;
  participants.value.forEach((p) => (p.isSpeaker = false));
  showSummary.value = true;
};

onMounted(() => {
  // stopTimer(); // Supprimé car il n'y a plus de timer
});
</script>

<template>
  <div class="daily-view">
    <div v-if="!isCompleted" class="daily-progress-bar">
      <div class="progress" :style="{ width: `${dailyProgress}%` }"></div>
    </div>

    <div class="dashboard-grid">
      <div v-if="!isCompleted" class="grid-section participants-section">
        <div class="section-header">
          <ParticipantForm
            v-if="!isCompleted"
            @add-participant="addParticipant"
          />
        </div>
        <ParticipantList
          :participants="participants"
          :selectedId="selectedId"
          :canSelectSpeaker="!hasStarted"
          @set-speaker="setSpeaker"
        />
      </div>

      <div v-if="!isCompleted" class="grid-section action-section">
        <div class="action-content">
          <button
            v-if="!selectedId"
            @click="selectRandomParticipant"
            class="select-button"
            :disabled="!hasStarted && !speaker"
          >
            {{ !hasStarted ? "Commencer le daily" : "Tirer au sort" }}
          </button>

          <button v-else @click="nextParticipant" class="next-button">
            Participant suivant
          </button>

          <SelectedParticipant
            :participant="selectedParticipant"
            @update-status="updateParticipantStatus"
            @update-mood="updateParticipantMood"
          />

          <button
            v-if="hasStarted && !isCompleted"
            @click="stopDaily"
            class="stop-button"
          >
            Arrêter le daily
          </button>
        </div>
      </div>

      <div v-if="isCompleted" class="grid-section summary-section full-width">
        <DailySummary
          :participants="completedParticipants"
          :speaker="speaker"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.daily-view {
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.daily-progress-bar {
  width: 90%;
  height: 5px;
  background-color: #e0e0e0;
  margin-bottom: 0.5rem;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.5s ease;
}

.dashboard-grid {
  width: 90%;
  height: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  overflow: hidden;
}

.grid-section {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.participants-section {
  grid-column: 1;
  display: flex;
  flex-direction: column;
}

.section-header {
  flex-shrink: 0;
  margin-bottom: 0.5rem;
}

.action-section {
  grid-column: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.action-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
}

.select-button,
.next-button,
.stop-button {
  width: 100%;
  max-width: 300px;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 1em;
  transition: all 0.3s ease;
  cursor: pointer;
}

.select-button {
  background-color: #0071e3;
  color: white;
}

.next-button {
  background-color: #34c759;
  color: white;
}

.stop-button {
  background-color: #ff3b30;
  color: white;
}

.select-button:disabled {
  background-color: #a2d2ff;
  cursor: not-allowed;
}

.full-width {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
