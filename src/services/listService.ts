import api from './api';
import type { ParticipantList } from '../types/participantList';
import type { Participant } from '../types/participant';

export const listService = {
  async getAll(): Promise<ParticipantList[]> {
    console.log('[LIST SERVICE] Fetching all lists');
    const response = await api.get('/listes');
    console.log('[LIST SERVICE] Fetched lists:', response.data);
    return response.data;
  },

  async addParticipant(listId: string, participantId: string): Promise<ParticipantList> {
    console.log(`[LIST SERVICE] Adding participant ${participantId} to list ${listId}`);
    try {
      const response = await api.patch(`/listes/${listId}/participants`, { 
        participantId 
      });
      console.log('[LIST SERVICE] Add participant response:', response.data);
      
      // Vérification de la structure de la réponse
      if (!response.data || !response.data.list) {
        throw new Error('Invalid response structure');
      }
      
      return response.data.list;
    } catch (error) {
      console.error('[LIST SERVICE] Error adding participant:', error);
      
      // Gestion des erreurs spécifiques
      if (api.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Erreur lors de l\'ajout du participant';
        throw new Error(errorMessage);
      }
      
      throw error;
    }
  },

  async create(list: Omit<ParticipantList, '_id'>): Promise<ParticipantList> {
    const response = await api.post('/listes', list);
    return response.data;
  },

  async update(_id: string, updates: Partial<ParticipantList>): Promise<ParticipantList> {
    const response = await api.patch(`/listes/${_id}`, updates);
    return response.data;
  },

  async delete(_id: string): Promise<void> {
    await api.delete(`/listes/${_id}`);
  },

  async removeParticipant(listId: string, participantId: string): Promise<ParticipantList> {
    const response = await api.delete(`/listes/${listId}/participants/${participantId}`);
    return response.data;
  }
};