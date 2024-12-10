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

  async addParticipant(listId: string, participantName: string): Promise<ParticipantList> {
    console.log(`[LIST SERVICE] Adding participant ${participantName} to list ${listId}`);
    try {
      // Validate IDs and names
      if (!listId || !participantName) {
        throw new Error('Invalid list ID or participant name');
      }

      // Create participant first
      const participantResponse = await api.post('/participants', { name: participantName });
      const newParticipant = participantResponse.data;

      // Then add participant to list
      const response = await api.patch(`/listes/${listId}/participants`, { 
        participantId: newParticipant.id 
      });
      
      console.log('[LIST SERVICE] Full response:', JSON.stringify(response, null, 2));
      console.log('[LIST SERVICE] Response data:', JSON.stringify(response.data, null, 2));
      
      // Vérification de la structure de la réponse
      if (!response.data) {
        console.error('[LIST SERVICE] Invalid response structure', response.data);
        throw new Error('Invalid response structure');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('[LIST SERVICE] Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      
      // Gestion des erreurs spécifiques
      if (api.isAxiosError(error)) {
        const defaultMessage = 'Erreur lors de l\'ajout du participant';
        const errorDetails = error.response?.data || error.response || error;
        
        console.error('[LIST SERVICE] Axios Error details:', JSON.stringify(errorDetails, null, 2));
        
        const errorMessage = 
          (errorDetails as any)?.message || 
          (errorDetails as any)?.error || 
          defaultMessage;
        
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