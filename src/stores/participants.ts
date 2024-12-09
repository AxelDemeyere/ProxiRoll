import { ref, toRaw } from 'vue';
import type { Participant } from '../types/participant';
import { participantService } from '../services/participantService';

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
    } catch (err) {
      error.value = 'Failed to load participants';
      if (err instanceof Error) {
        console.error('Error fetching participants:', err.message);
      }
    } finally {
      loading.value = false;
    }
  };

  const setParticipants = async (newParticipants: Participant[]) => {
    loading.value = true;
    error.value = null;
    try {
      // Clear existing participants
      const currentParticipants = toRaw(participants.value);
      for (const participant of currentParticipants) {
        await participantService.delete(participant.id);
      }
      
      // Add new participants
      participants.value = [];
      for (const participant of newParticipants) {
        const created = await participantService.create(toRaw(participant));
        participants.value = [...participants.value, created];
      }
    } catch (err) {
      error.value = 'Failed to update participants';
      if (err instanceof Error) {
        console.error('Error updating participants:', err.message);
      }
    } finally {
      loading.value = false;
    }
  };

  const updateParticipant = async (id: string, updates: Partial<Participant>) => {
    try {
      const updated = await participantService.update(id, toRaw(updates));
      const index = participants.value.findIndex(p => p.id === id);
      if (index !== -1) {
        participants.value = [
          ...participants.value.slice(0, index),
          updated,
          ...participants.value.slice(index + 1)
        ];
      }
    } catch (err) {
      error.value = 'Failed to update participant';
      if (err instanceof Error) {
        console.error('Error updating participant:', err.message);
      }
    }
  };

  return {
    participants,
    loading,
    error,
    fetchParticipants,
    setParticipants,
    updateParticipant
  };
};