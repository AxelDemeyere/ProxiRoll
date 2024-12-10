<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useListsStore } from '../stores/lists';
import { useParticipantsStore } from '../stores/participants';
import ListEditor from '../components/ListEditor.vue';

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
    <div class="content-wrapper">
      <div class="header">
        <h2>Listes de participants</h2>
        <div class="new-list-form">
          <input
            v-model="newListName"
            type="text"
            placeholder="Nom de la nouvelle liste"
            class="new-list-input"
            @keyup.enter="createList"
          />
          <button @click="createList">
            Créer une liste
          </button>
        </div>
      </div>

      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p>Chargement des listes...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button class="retry-button" @click="fetchLists">Réessayer</button>
      </div>

      <div v-else class="lists-grid">
        <div v-for="list in lists" :key="list._id" class="list-container">
          <ListEditor
            :list="list"
            @update="updates => updateList(list._id, updates)"
            @delete="deleteList(list._id)"
            @add-participant="name => addParticipantToList(list._id, name)"
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
  padding: 1rem 0;
}

.content-wrapper {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 24px;
  padding: 2rem;
  background-color: #ffffff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.new-list-form {
  display: flex;
  gap: 1rem;
}

.new-list-input {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #d2d2d7;
  min-width: 250px;
}

.lists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.use-list-button {
  width: 100%;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--text-color);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 2rem;
  color: #ff3b30;
  background-color: #fff2f2;
  border-radius: 12px;
}

.retry-button {
  margin-top: 1rem;
  background-color: #ff3b30;
}

.retry-button:hover {
  background-color: #ff453a;
}
</style>