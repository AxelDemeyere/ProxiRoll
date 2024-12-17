import api from './api';
import { Participant } from '../types/participant';

export interface ParticipantList {
  _id: string;
  name: string;
  participants: Participant[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const listService = {
  async getAll(): Promise<ParticipantList[]> {
    const response = await api.get('/listes');
    return response.data;
  },

  async get(_id: string): Promise<ParticipantList> {
    const response = await api.get(`/listes/${_id}`);
    return response.data;
  },

  async create(list: Omit<ParticipantList, '_id'>): Promise<ParticipantList> {
    const response = await api.post('/listes', list);
    return response.data;
  },

  async update(_id: string, updates: Partial<ParticipantList>): Promise<ParticipantList> {
    console.log('[LIST SERVICE] Updating list:', { _id, updates });
    
    try {
      if (!_id) {
        throw new Error('ID de liste invalide');
      }

      const response = await api.patch(`/listes/${_id}`, updates);
      console.log('[LIST SERVICE] Update response:', response.data);
      
      if (!response.data) {
        throw new Error('Impossible de mettre à jour la liste');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('[LIST SERVICE] Update error:', error);
      throw error;
    }
  },

  async delete(_id: string): Promise<void> {
    console.log('[LIST SERVICE] Deleting list:', _id);
    try {
      await api.delete(`/listes/${_id}`);
    } catch (error: any) {
      console.error('[LIST SERVICE] Delete error:', error);
      throw error;
    }
  },

  async addParticipant(listId: string, participantId: string): Promise<ParticipantList> {
    const response = await api.patch(`/listes/${listId}/participants`, { participantId });
    return response.data;
  },

  async removeParticipant(listId: string, participantId: string): Promise<ParticipantList> {
    const response = await api.delete(`/listes/${listId}/participants/${participantId}`);
    return response.data;
  }
};