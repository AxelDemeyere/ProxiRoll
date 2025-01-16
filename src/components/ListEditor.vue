<script setup lang="ts">
import { ref } from "vue";
import type { ParticipantList } from "../types/participantList";
import ParticipantSelector from "./ParticipantSelector.vue";

const props = defineProps<{
  list: ParticipantList;
}>();

const emit = defineEmits<{
  (e: "update", updates: Partial<ParticipantList>): void;
  (e: "delete"): void;
  (e: "addParticipant", participantId: string): void;
  (e: "removeParticipant", participantId: string): void;
}>();

const isEditing = ref(false);
const editedName = ref(props.list.name);

const startEditing = () => {
  isEditing.value = true;
  editedName.value = props.list.name;
};

const saveChanges = () => {
  if (editedName.value.trim()) {
    emit("update", { name: editedName.value.trim() });
    isEditing.value = false;
  }
};

const handleParticipantSelect = (participantId: string) => {
  console.log('Selected participant:', participantId);
  emit("addParticipant", participantId);
};
</script>

<template>
  <div class="list-editor">
    <div class="list-header">
      <div v-if="!isEditing" class="list-title">
        <h3>{{ list.name }}</h3>
        <div class="list-actions">
          <button class="icon-button" @click="startEditing">✏️</button>
          <button class="icon-button delete" @click="$emit('delete')">
            🗑️
          </button>
        </div>
      </div>

      <form v-else @submit.prevent="saveChanges" class="edit-form">
        <input
          v-model="editedName"
          type="text"
          placeholder="Nom de la liste"
          required
          class="input-field"
        />
        <div class="form-actions">
          <button type="submit" class="save-button">Sauvegarder</button>
          <button
            type="button"
            class="cancel-button"
            @click="isEditing = false"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>

    <div class="participants-section">
      <h4>Participants</h4>
      <ParticipantSelector @select-participant="handleParticipantSelect" />
      
      <div v-if="list.participants.length === 0" class="empty-message">
        Aucun participant dans cette liste
      </div>
      
      <ul v-else class="participants-list">
        <li
          v-for="participant in list.participants"
          :key="participant._id"
          class="participant-item"
        >
          {{ participant.name }}
          <button
            class="remove-button"
            @click="$emit('removeParticipant', participant._id)"
          >
            ❌
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.list-editor {
  border: 1px solid #d2d2d7;
  border-radius: 16px 16px 0 0;
  padding: 1.5rem;
  overflow: hidden; 
  position: relative; 
}

.list-header {
  margin-bottom: 1.5rem;
}

.list-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem; 
}

.list-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-form {
  display: flex;
  gap: 0.5rem;
}

.input-field {
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

.icon-button.delete:hover {
  color: #ff3b30;
}

.participants-section {
  margin-top: 1rem;
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

.save-button,
.cancel-button {
  padding: 8px 16px;
  font-size: 0.9em;
}

.remove-button {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  font-size: 1em;
}

.empty-message {
  padding: 1rem;
  text-align: center;
  color: #666;
}
</style>
