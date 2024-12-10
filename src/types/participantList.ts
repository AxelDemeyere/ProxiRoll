export interface ParticipantList {
  _id: string;
  name: string;
  participants: Array<{ _id: string; name: string }>;
}
