import { ref } from 'vue';
import type { Participant } from '../types/participant';

const participants = ref<Participant[]>([]);

export const useParticipantsStore = () => {
  const setParticipants = (newParticipants: Participant[]) => {
    participants.value = [...newParticipants];
  };

  return {
    participants,
    setParticipants,
  };
};