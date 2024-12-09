import api from './api';
import type { Participant } from '../types/participant';

export const participantService = {
  async getAll(): Promise<Participant[]> {
    const response = await api.get('/participants');
    return response.data;
  },

  async create(participant: Omit<Participant, 'id'>): Promise<Participant> {
    const response = await api.post('/participants', participant);
    return response.data;
  },

  async update(id: string, updates: Partial<Participant>): Promise<Participant> {
    const response = await api.patch(`/participants/${id}`, updates);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/participants/${id}`);
  }
};