import { ref } from 'vue';
import { participantService } from '../services/participantService';
import type { Participant } from '../types/participant';
import axios from 'axios';

const participants = ref<Participant[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export const useParticipantsStore = () => {
  const fetchParticipants = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await participantService.getAll();
      participants.value = response;
    } catch (err: unknown) {
      error.value = "Impossible de charger les participants";
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Error fetching participants:", err.message);
      } else {
        console.error("Unknown error fetching participants:", err);
      }
    } finally {
      loading.value = false;
    }
  };

  const addParticipant = async (participant: Omit<Participant, '_id'>) => {
    try {
      console.log('[PARTICIPANTS STORE] Adding participant:', participant);
      const newParticipant = await participantService.create(participant);
      participants.value.push(newParticipant);
      return newParticipant;
    } catch (err: unknown) {
      error.value = "Impossible d'ajouter le participant";
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Error adding participant:", err.message);
      } else {
        console.error("Unknown error adding participant:", err);
      }
      throw err;
    }
  };

  const deleteParticipant = async (participantId: string) => {
    try {
      console.log('[PARTICIPANTS STORE] Deleting participant:', participantId);
      await participantService.delete(participantId);
      participants.value = participants.value.filter(p => p._id !== participantId);
    } catch (err: unknown) {
      error.value = "Impossible de supprimer le participant";
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.error("Error deleting participant:", err.message);
      } else {
        console.error("Unknown error deleting participant:", err);
      }
      throw err;
    }
  };

  const setParticipants = (newParticipants: Participant[]) => {
    participants.value = newParticipants;
  };

  return {
    participants,
    loading,
    error,
    fetchParticipants,
    addParticipant,
    deleteParticipant,
    setParticipants,
  };
};