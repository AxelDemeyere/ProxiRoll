<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { participantService } from '../services/participantService';
import type { Participant } from '../types/participant';

const emit = defineEmits<{
  (e: 'selectParticipant', participantId: string): void;
}>();

const availableParticipants = ref<Participant[]>([]);
const selectedParticipantId = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

const loadAvailableParticipants = async () => {
  loading.value = true;
  error.value = null;
  try {
    availableParticipants.value = await participantService.getAvailable();
  } catch (err) {
    error.value = 'Erreur lors du chargement des participants';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleSelect = () => {
  if (selectedParticipantId.value) {
    emit('selectParticipant', selectedParticipantId.value);
    selectedParticipantId.value = '';
  }
};

onMounted(loadAvailableParticipants);
</script>

<template>
  <div class="participant-selector">
    <div v-if="loading" class="loading">
      Chargement des participants...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="selector-container">
      <select
        v-model="selectedParticipantId"
        class="participant-select"
        :disabled="availableParticipants.length === 0"
      >
        <option value="">Sélectionner un participant</option>
        <option
          v-for="participant in availableParticipants"
          :key="participant._id"
          :value="participant._id"
        >
          {{ participant.name }}
        </option>
      </select>
      <button
        @click="handleSelect"
        class="add-button"
        :disabled="!selectedParticipantId"
      >
        Ajouter
      </button>
    </div>
  </div>
</template>

<style scoped>
.participant-selector {
  margin: 1rem 0;
}

.selector-container {
  display: flex;
  gap: 1rem;
}

.participant-select {
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #d2d2d7;
  background-color: #ffffff;
  color: #1d1d1f;
  font-size: 1em;
  transition: all 0.2s ease;
}

.participant-select:focus {
  outline: none;
  border-color: #0071e3;
}

.add-button {
  padding: 12px 24px;
  border-radius: 12px;
  background-color: #0071e3;
  color: white;
  border: none;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-button:hover {
  background-color: #0077ed;
}

.add-button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.loading, .error {
  text-align: center;
  padding: 1rem;
  color: #666;
}

.error {
  color: #ff3b30;
}
</style>
