import { ref, toRaw } from "vue";
import { listService } from "../services/listService";
import { participantService } from "../services/participantService";
import type { ParticipantList } from "../types/participantList";
import type { Participant } from "../types/participant";
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
      lists.value = [...lists.value, newList];
    } catch (err: unknown) {
      error.value = "Impossible de créer la liste";
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Error creating list:", err.message);
      } else {
        console.error("Unknown error creating list:", err);
      }
    }
  };

  const addParticipantToList = async (listId: string, participantId: string) => {
    loading.value = true;
    error.value = null;
    try {
      // Ajouter le participant à la liste via le service
      const updatedList = await listService.addParticipant(listId, participantId);
      
      // Mettre à jour la liste dans le store
      const listIndex = lists.value.findIndex(list => list._id === listId);
      if (listIndex !== -1) {
        lists.value[listIndex] = updatedList;
      }

      return updatedList;
    } catch (err: unknown) {
      error.value = "Impossible d'ajouter le participant à la liste";
      
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
        error.value = err.response?.data?.error || "Erreur lors de l'ajout du participant";
      } else if (err instanceof Error) {
        console.error("Error adding participant to list:", err.message);
        error.value = err.message;
      } else {
        console.error("Unknown error adding participant to list:", err);
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateList = async (
    _id: string, 
    updates: Partial<ParticipantList>
  ) => {
    try {
      const updatedList = await listService.update(_id, updates);
      const listIndex = lists.value.findIndex(list => list._id === _id);
      
      if (listIndex !== -1) {
        lists.value[listIndex] = updatedList;
      }
    } catch (err: unknown) {
      error.value = "Impossible de mettre à jour la liste";
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Error updating list:", err.message);
      } else {
        console.error("Unknown error updating list:", err);
      }
    }
  };

  const removeParticipantFromList = async (listId: string, participantId: string) => {
    try {
      const updatedList = await listService.removeParticipant(listId, participantId);
      const listIndex = lists.value.findIndex(list => list._id === listId);
      
      if (listIndex !== -1) {
        lists.value[listIndex] = updatedList;
      }
    } catch (err: unknown) {
      error.value = "Impossible de supprimer le participant de la liste";
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Error removing participant from list:", err.message);
      } else {
        console.error("Unknown error removing participant from list:", err);
      }
    }
  };

  return {
    lists,
    loading,
    error,
    fetchLists,
    addList,
    addParticipantToList,
    updateList,
    removeParticipantFromList
  };
};