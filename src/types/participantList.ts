export interface ParticipantList {
  id: string;
  name: string;
  participants: Array<{ id: string; name: string }>;
}
