import type { Participant } from './participant';

export interface ParticipantList {
  id: string;
  name: string;
  participants: Participant[];
}