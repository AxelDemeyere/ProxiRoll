import api from './api';
import type { Participant } from '../types/participant';

export const participantService = {
  async getAll(): Promise<Participant[]> {
    const response = await api.get('/participants');
    return response.data;
  },

  async getAvailable(): Promise<Participant[]> {
    const response = await api.get('/participants/available');
    return response.data;
  },

  async create(participant: Omit<Participant, '_id'>): Promise<Participant> {
    const response = await api.post('/participants', participant);
    return response.data;
  },

  async update(_id: string, updates: Partial<Participant>): Promise<Participant> {
    const response = await api.patch(`/participants/${_id}`, updates);
    return response.data;
  },

  async delete(_id: string): Promise<void> {
    await api.delete(`/participants/${_id}`);
  }
};