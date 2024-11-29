<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'addParticipant', name: string): void;
}>();

const participantName = ref('');

const handleSubmit = () => {
  if (participantName.value.trim()) {
    emit('addParticipant', participantName.value.trim());
    participantName.value = '';
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="participant-form">
    <input
      v-model="participantName"
      type="text"
      placeholder="Nom du participant"
      required
      class="input-field"
    />
    <button type="submit" class="add-button">Ajouter</button>
  </form>
</template>

<style scoped>
.participant-form {
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
}

.input-field {
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #d2d2d7;
  background-color: #ffffff;
  color: #1d1d1f;
  font-size: 1em;
  transition: all 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.3);
}

.add-button {
  min-width: 120px;
}
</style>