import { ref } from 'vue';
import type { ParticipantList } from '../types/participantList';
import { generateId } from '../utils/random';

const lists = ref<ParticipantList[]>([
  {
    id: generateId(),
    name: 'Équipe Frontend',
    participants: [
      { id: generateId(), name: 'Alice' },
      { id: generateId(), name: 'Bob' },
      { id: generateId(), name: 'Charlie' }
    ]
  },
  {
    id: generateId(),
    name: 'Équipe Backend',
    participants: [
      { id: generateId(), name: 'David' },
      { id: generateId(), name: 'Eve' },
      { id: generateId(), name: 'Frank' }
    ]
  }
]);

export const useListsStore = () => {
  const addList = (name: string) => {
    lists.value.push({
      id: generateId(),
      name,
      participants: []
    });
  };

  const updateList = (listId: string, updates: Partial<ParticipantList>) => {
    const index = lists.value.findIndex(list => list.id === listId);
    if (index !== -1) {
      lists.value[index] = { ...lists.value[index], ...updates };
    }
  };

  const deleteList = (listId: string) => {
    lists.value = lists.value.filter(list => list.id !== listId);
  };

  const addParticipantToList = (listId: string, name: string) => {
    const list = lists.value.find(l => l.id === listId);
    if (list) {
      list.participants.push({
        id: generateId(),
        name
      });
    }
  };

  const removeParticipantFromList = (listId: string, participantId: string) => {
    const list = lists.value.find(l => l.id === listId);
    if (list) {
      list.participants = list.participants.filter(p => p.id !== participantId);
    }
  };

  return {
    lists,
    addList,
    updateList,
    deleteList,
    addParticipantToList,
    removeParticipantFromList
  };
};