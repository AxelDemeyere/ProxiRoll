export interface Participant {
  _id: string;
  name: string;
  status?: 'present' | 'absent';
  mood?: 'good' | 'neutral' | 'bad';
  isSpeaker?: boolean;
}