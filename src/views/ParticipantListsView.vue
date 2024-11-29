<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useListsStore } from '../stores/lists';
import { useParticipantsStore } from '../stores/participants';
import ListEditor from '../components/ListEditor.vue';

const router = useRouter();
const { lists, addList, updateList, deleteList, addParticipantToList, removeParticipantFromList } = useListsStore();
const { setParticipants } = useParticipantsStore();

const newListName = ref('');

const createList = () => {
  if (newListName.value.trim()) {
    addList(newListName.value.trim());
    newListName.value = '';
  }
};

const selectList = async (listId: string) => {
  const list = lists.value.find(l => l.id === listId);
  if (list) {
    setParticipants([...list.participants]);
    await router.push('/');
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

      <div class="lists-grid">
        <div v-for="list in lists" :key="list.id" class="list-container">
          <ListEditor
            :list="list"
            @update="updates => updateList(list.id, updates)"
            @delete="deleteList(list.id)"
            @add-participant="name => addParticipantToList(list.id, name)"
            @remove-participant="participantId => removeParticipantFromList(list.id, participantId)"
          />
          <button 
            class="use-list-button"
            @click="selectList(list.id)"
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
</style>