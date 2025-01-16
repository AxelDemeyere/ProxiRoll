<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ListEditor from '../components/ListEditor.vue';
import { useListsStore } from '../stores/lists';
import { useParticipantsStore } from '../stores/participants';

const router = useRouter();
const { 
  lists, 
  loading, 
  error,
  fetchLists,
  addList, 
  updateList, 
  deleteList, 
  addParticipantToList, 
  removeParticipantFromList 
} = useListsStore();

const { setParticipants } = useParticipantsStore();

const newListName = ref('');

onMounted(async () => {
  try {
    await fetchLists();
  } catch (err) {
    console.error('Failed to fetch lists:', err);
  }
});

const createList = async () => {
  if (newListName.value.trim()) {
    try {
      await addList(newListName.value.trim());
      newListName.value = '';
    } catch (err) {
      console.error('Failed to create list:', err);
    }
  }
};

const selectList = async (listId: string) => {
  const list = lists.value.find(l => l._id === listId);
  if (list) {
    try {
      await setParticipants([...list.participants]);
      await router.push('/');
    } catch (err) {
      console.error('Failed to select list:', err);
    }
  }
};
</script>

<template>
  <div class="lists-view">
    <div class="content-container">
      <div class="header">
        <h1>Listes de participants</h1>
        <p class="subtitle">Gérez les listes de participants</p>
      </div>

      <form @submit.prevent="createList" class="new-list-form card">
        <div class="form-group">
          <input
            v-model="newListName"
            type="text"
            placeholder="Nom de la nouvelle liste"
            class="input"
            required
          />
        </div>
        <button type="submit" class="button button-primary">
          Créer
        </button>
      </form>

      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p>Chargement des listes...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button class="retry-button" @click="fetchLists">Réessayer</button>
      </div>

      <div v-else-if="lists.length === 0" class="empty-message">
        Aucune liste créée
      </div>

      <div v-else class="lists-grid">
        <div
          v-for="list in lists"
          :key="list._id"
          class="list-container"
        >
          <ListEditor
            :list="list"
            @update="updates => updateList(list._id, updates)"
            @delete="deleteList(list._id)"
            @add-participant="participantId => addParticipantToList(list._id, participantId)"
            @remove-participant="participantId => removeParticipantFromList(list._id, participantId)"
          />
          <button 
            class="use-list-button"
            @click="selectList(list._id)"
          >
            Utiliser cette liste
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.lists-view {
  padding: 2rem 1rem;
  animation: fadeIn 0.3s ease-out;
  min-height: 100vh;
  background-color: var(--background-color);
}

@media (max-width: 768px) {
  .lists-view {
    padding: 0.5rem;
  }
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

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.2rem;
    text-align: center;
  }
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.2rem;
  font-weight: 400;
}

.new-list-form {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 768px) {
  .new-list-form {
    flex-direction: column;
    gap: 0.5rem;
  }

  .new-list-form{
    width: 100%;
  }
}

.form-group {
  flex: 1;
}

.new-list-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.new-list-input:focus {
  border-color: #42b983;
  outline: none;
}

.create-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  height: 40px;
  transition: background-color 0.2s;
}

.create-button:hover {
  background-color: #3aa876;
}

.button-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

@media (max-width: 480px) {
  .button-text {
    display: none;
  }

  .create-button {
    padding: 0.5rem;
  }

  .button-icon {
    margin: 0;
  }
}

.empty-message {
  text-align: center;
  color: #666;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.lists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

@media (max-width: 640px) {
  .lists-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}



.list-container:hover {
  border-radius: 16px;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.use-list-button {
  border-radius: 0 0 16px 16px;
  width: 100%;
  padding: 0.75rem;
  background-color: #007AFF;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.use-list-button:hover {
  background-color: #0066CC;
}

@media (max-width: 480px) {
  .use-list-button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .lists-view {
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

  .new-list-form {
    padding: 1rem;
    margin: 0 0.5rem;
  }
}
</style>