import api from './api';
import type { ParticipantList } from '../types/participantList';

export const listService = {
  async getAll(): Promise<ParticipantList[]> {
    const response = await api.get('/listes');
    return response.data;
  },

  async create(list: Omit<ParticipantList, 'id'>): Promise<ParticipantList> {
    const response = await api.post('/listes', list);
    return response.data;
  },

  async update(id: string, updates: Partial<ParticipantList>): Promise<ParticipantList> {
    const response = await api.patch(`/listes/${id}`, updates);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/listes/${id}`);
  }
};