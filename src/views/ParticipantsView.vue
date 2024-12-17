<template>
  <div class="participants-view">
    <div class="content-container">
      <div class="header">
        <h1>Participants</h1>
        <p class="subtitle">Gérez les participants de vos tirages au sort</p>
      </div>

      <form @submit.prevent="createParticipant" class="add-participant-form card">
        <div class="form-group">
          <input
            v-model="newParticipantName"
            type="text"
            placeholder="Nom du participant"
            class="input"
            required
          />
        </div>
        <button type="submit" class="button button-primary">
          Ajouter
        </button>
      </form>

      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Chargement des participants...</p>
      </div>

      <div v-else-if="error" class="error-state card">
        <p>{{ error }}</p>
        <button @click="fetchParticipants" class="button button-secondary">
          Réessayer
        </button>
      </div>

      <div v-else-if="participants.length === 0" class="empty-state card">
        <div class="empty-icon">👥</div>
        <h3>Aucun participant</h3>
        <p>Commencez par ajouter des participants à votre liste</p>
      </div>

      <div v-else class="participants-grid">
        <div
          v-for="participant in participants"
          :key="participant._id"
          class="participant-card card"
        >
          <div class="participant-info">
            <h3>{{ participant.name }}</h3>
          </div>
          <button
            @click="removeParticipant(participant._id)"
            class="button button-danger button-icon"
            title="Supprimer le participant"
          >
            <span class="sr-only">Supprimer</span>
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useParticipantsStore } from '../stores/participants';

const { participants, loading, error, fetchParticipants, addParticipant, deleteParticipant } = useParticipantsStore();

const newParticipantName = ref('');

onMounted(async () => {
  try {
    await fetchParticipants();
  } catch (err) {
    console.error('Failed to fetch participants:', err);
  }
});

const createParticipant = async () => {
  if (newParticipantName.value.trim()) {
    try {
      await addParticipant({
        name: newParticipantName.value.trim()
      });
      newParticipantName.value = '';
    } catch (err) {
      console.error('Failed to create participant:', err);
    }
  }
};

const removeParticipant = async (participantId: string) => {
  try {
    await deleteParticipant(participantId);
  } catch (err) {
    console.error('Failed to delete participant:', err);
  }
};
</script>

<style scoped>
.participants-view {
  padding: 2rem 1rem;
  animation: fadeIn 0.3s ease-out;
  min-height: 100vh;
  background-color: var(--background-color);
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.header {
  text-align: center;
  padding: 1rem 0 2rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.2rem;
  font-weight: 400;
}

.add-participant-form {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
}

.form-group {
  flex: 1;
}

.participants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 0.5rem;
}

.participant-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.participant-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.participant-info {
  flex: 1;
  min-width: 0;
}

.participant-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.button-icon {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  background: transparent;
  border: 1px solid var(--border-color);
}

.button-icon:hover {
  background-color: var(--danger-color);
  border-color: var(--danger-color);
  color: white;
  transform: scale(1.05);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 400px;
  margin: 0 auto;
}

.loading-state {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

.error-state {
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
}

.error-state p {
  color: var(--danger-color);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 768px) {
  .participants-view {
    padding: 1rem 0.5rem;
  }

  .header {
    padding: 0.5rem 0 1.5rem;
  }

  .header h1 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .add-participant-form {
    padding: 1rem;
    margin: 0 0.5rem;
  }

  .participants-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0.5rem;
  }

  .participant-card {
    padding: 1rem;
    margin: 0 0.5rem;
  }

  .empty-state {
    padding: 3rem 1rem;
    margin: 0 0.5rem;
  }

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .empty-state h3 {
    font-size: 1.25rem;
  }

  .empty-state p {
    font-size: 1rem;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
