<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ParticipantList } from '../types/participantList';

const props = defineProps<{
  list: ParticipantList;
}>();

const emit = defineEmits<{
  (e: 'update', updates: Partial<ParticipantList>): void;
  (e: 'delete'): void;
  (e: 'addParticipant', name: string): void;
  (e: 'removeParticipant', participantId: string): void;
}>();

const isEditing = ref(false);
const editedName = ref(props.list.name);
const newParticipantName = ref('');

const startEditing = () => {
  isEditing.value = true;
  editedName.value = props.list.name;
};

const saveChanges = () => {
  if (editedName.value.trim()) {
    emit('update', { name: editedName.value.trim() });
    isEditing.value = false;
  }
};

const addParticipant = () => {
  if (newParticipantName.value.trim()) {
    emit('addParticipant', newParticipantName.value.trim());
    newParticipantName.value = '';
  }
};

const showAllParticipants = ref(false);
const PARTICIPANTS_LIMIT = 3;

const displayedParticipants = computed(() => {
  if (showAllParticipants.value || props.list.participants.length <= PARTICIPANTS_LIMIT) {
    return props.list.participants;
  }
  return props.list.participants.slice(0, PARTICIPANTS_LIMIT);
});

const toggleParticipantsDisplay = () => {
  showAllParticipants.value = !showAllParticipants.value;
};
</script>

<template>
  <div class="list-editor">
    <div class="list-header">
      <div v-if="!isEditing" class="list-title">
        <h3>{{ list.name }}</h3>
        <div class="list-actions">
          <button class="icon-button" @click="startEditing">
            ✏️
          </button>
          <button class="icon-button delete" @click="$emit('delete')">
            🗑️
          </button>
        </div>
      </div>
      <div v-else class="edit-form">
        <input
          v-model="editedName"
          type="text"
          class="edit-input"
          @keyup.enter="saveChanges"
        />
        <button class="save-button" @click="saveChanges">
          Enregistrer
        </button>
      </div>
    </div>

    <div class="add-participant">
      <input
        v-model="newParticipantName"
        type="text"
        placeholder="Nouveau participant"
        class="participant-input"
        @keyup.enter="addParticipant"
      />
      <button class="add-button" @click="addParticipant">
        Ajouter
      </button>
    </div>

    <div class="participants-section">
      <ul class="participants-list">
        <li v-for="participant in displayedParticipants" :key="participant.id">
          <span>{{ participant.name }}</span>
          <button
            class="icon-button small"
            @click="$emit('removeParticipant', participant.id)"
          >
            ❌
          </button>
        </li>
      </ul>
      
      <button 
        v-if="props.list.participants.length > PARTICIPANTS_LIMIT"
        @click="toggleParticipantsDisplay"
        class="toggle-button"
      >
        {{ showAllParticipants ? 'Voir moins' : `Voir plus (${props.list.participants.length - PARTICIPANTS_LIMIT})` }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.list-editor {
  border: 1px solid #d2d2d7;
  border-radius: 16px;
  padding: 1.5rem;
  background-color: white;
}

.list-header {
  margin-bottom: 1.5rem;
}

.list-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-form {
  display: flex;
  gap: 0.5rem;
}

.edit-input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d2d2d7;
}

.icon-button {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  font-size: 1.2em;
}

.icon-button.small {
  font-size: 1em;
  padding: 2px;
}

.icon-button.delete:hover {
  color: #ff3b30;
}

.add-participant {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.participant-input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d2d2d7;
}

.participants-list {
  list-style: none;
  padding: 0;
}

.participants-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin: 4px 0;
  background-color: #f5f5f7;
  border-radius: 8px;
}

.save-button, .add-button {
  padding: 8px 16px;
  font-size: 0.9em;
}

.toggle-button {
  background: none;
  border: none;
  color: #0071e3;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 0.9em;
  margin-top: 8px;
}

.toggle-button:hover {
  text-decoration: underline;
}

.participants-section {
  display: flex;
  flex-direction: column;
}

</style>