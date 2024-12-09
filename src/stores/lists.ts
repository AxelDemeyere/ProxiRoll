import { ref, toRaw } from "vue";
import { listService } from "../services/listService";
import type { ParticipantList } from "../types/participantList";

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
    } catch (err) {
      error.value = "Failed to load lists";
      if (err instanceof Error) {
        console.error("Error fetching lists:", err.message);
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
    } catch (err) {
      error.value = "Failed to create list";
      if (err instanceof Error) {
        console.error("Error creating list:", err.message);
      }
    }
  };

  const updateList = async (
    listId: string,
    updates: Partial<ParticipantList>
  ) => {
    try {
      const updatedList = await listService.update(listId, toRaw(updates));
      const index = lists.value.findIndex((list) => list.id === listId);
      if (index !== -1) {
        lists.value = [
          ...lists.value.slice(0, index),
          updatedList,
          ...lists.value.slice(index + 1),
        ];
      }
    } catch (err) {
      error.value = "Failed to update list";
      if (err instanceof Error) {
        console.error("Error updating list:", err.message);
      }
    }
  };

  const deleteList = async (listId: string) => {
    try {
      await listService.delete(listId);
      lists.value = lists.value.filter((list) => list.id !== listId);
    } catch (err) {
      error.value = "Failed to delete list";
      if (err instanceof Error) {
        console.error("Error deleting list:", err.message);
      }
    }
  };

  const addParticipantToList = async (id: string, name: string) => {
    const list = lists.value.find((l) => l.id === id);
    if (list) {
      try {
        const updatedList = await listService.update(id, {
          ...toRaw(list),
          participants: [...list.participants, { id, name }],
        });
        const index = lists.value.findIndex((l) => l.id === id);
        if (index !== -1) {
          lists.value = [
            ...lists.value.slice(0, index),
            updatedList,
            ...lists.value.slice(index + 1),
          ];
        }
      } catch (err) {
        error.value = "Failed to add participant";
        if (err instanceof Error) {
          console.error("Error adding participant:", err.message);
          console.error("Full error:", err); // Ajoute cette ligne pour voir toute l'erreur
        } else {
          console.error("Unexpected error:", err);
        }
      }
    }
  };

  const removeParticipantFromList = async (
    listId: string,
    participantId: string
  ) => {
    const list = lists.value.find((l) => l.id === listId);
    if (list) {
      try {
        const updatedList = await listService.update(listId, {
          ...toRaw(list),
          participants: list.participants.filter((p) => p.id !== participantId),
        });
        const index = lists.value.findIndex((l) => l.id === listId);
        if (index !== -1) {
          lists.value = [
            ...lists.value.slice(0, index),
            updatedList,
            ...lists.value.slice(index + 1),
          ];
        }
      } catch (err) {
        error.value = "Failed to remove participant";
        if (err instanceof Error) {
          console.error("Error removing participant:", err.message);
        }
      }
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
    removeParticipantFromList,
  };
};
