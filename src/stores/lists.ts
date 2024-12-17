import { ref } from "vue";
import { listService } from "../services/listService";
import { participantService } from "../services/participantService";
import type { ParticipantList } from "../types/participantList";
import axios from 'axios';

const lists = ref<ParticipantList[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export const useListsStore = () => {
  const fetchLists = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await listService.getAll();
      lists.value = response;
    } catch (err: unknown) {
      error.value = "Impossible de charger les listes";
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Error fetching lists:", err.message);
      } else {
        console.error("Unknown error fetching lists:", err);
      }
    } finally {
      loading.value = false;
    }
  };

  const addList = async (name: string) => {
    try {
      const newList = await listService.create({
        name,
        participants: [],
      });
      // Ajouter la nouvelle liste au store
      lists.value = [...lists.value, newList];
      // Rafraîchir la liste complète
      await fetchLists();
      return newList;
    } catch (err: unknown) {
      error.value = "Impossible de créer la liste";
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Error creating list:", err.message);
      } else {
        console.error("Unknown error creating list:", err);
      }
      throw err;
    }
  };

  const addParticipantToList = async (listId: string, participantId: string) => {
    try {
      console.log('Adding participant to list:', { listId, participantId });
      const updatedList = await listService.addParticipant(listId, participantId);
      
      // Mettre à jour la liste dans le store
      const listIndex = lists.value.findIndex(list => list._id === listId);
      if (listIndex !== -1) {
        lists.value[listIndex] = updatedList;
      }
      
      // Rafraîchir la liste complète pour s'assurer de la synchronisation
      await fetchLists();
      return updatedList;
    } catch (err: unknown) {
      error.value = "Impossible d'ajouter le participant à la liste";
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Error adding participant to list:", err.message);
      } else {
        console.error("Unknown error adding participant to list:", err);
      }
      throw err;
    }
  };

  const updateList = async (_id: string, updates: Partial<ParticipantList>) => {
    try {
      console.log('[LISTS STORE] Updating list:', { _id, updates });
      const updatedList = await listService.update(_id, updates);
      
      // Mettre à jour la liste dans le store
      const listIndex = lists.value.findIndex(list => list._id === _id);
      if (listIndex !== -1) {
        lists.value[listIndex] = updatedList;
      }
      
      // Rafraîchir la liste complète pour s'assurer de la synchronisation
      await fetchLists();
      return updatedList;
    } catch (err: unknown) {
      error.value = "Impossible de mettre à jour la liste";
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Error updating list:", err.message);
      } else {
        console.error("Unknown error updating list:", err);
      }
      throw err;
    }
  };

  const deleteList = async (_id: string) => {
    try {
      console.log('[LISTS STORE] Deleting list:', _id);
      await listService.delete(_id);
      
      // Supprimer la liste du store
      lists.value = lists.value.filter(list => list._id !== _id);
      
      // Rafraîchir la liste complète pour s'assurer de la synchronisation
      await fetchLists();
    } catch (err: unknown) {
      error.value = "Impossible de supprimer la liste";
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Error deleting list:", err.message);
      } else {
        console.error("Unknown error deleting list:", err);
      }
      throw err;
    }
  };

  const removeParticipantFromList = async (listId: string, participantId: string) => {
    try {
      console.log('Removing participant from list:', { listId, participantId });
      const updatedList = await listService.removeParticipant(listId, participantId);
      
      // Mettre à jour la liste dans le store
      const listIndex = lists.value.findIndex(list => list._id === listId);
      if (listIndex !== -1) {
        lists.value[listIndex] = updatedList;
      }
      
      // Rafraîchir la liste complète pour s'assurer de la synchronisation
      await fetchLists();
      return updatedList;
    } catch (err: unknown) {
      error.value = "Impossible de supprimer le participant de la liste";
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Error removing participant from list:", err.message);
      } else {
        console.error("Unknown error removing participant from list:", err);
      }
      throw err;
    }
  };

  return {
    lists,
    loading,
    error,
    fetchLists,
    addList,
    updateList,
    deleteList,
    addParticipantToList,
    removeParticipantFromList
  };
};