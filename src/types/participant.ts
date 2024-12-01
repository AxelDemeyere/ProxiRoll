export interface Participant {
  id: string;
  name: string;
  status?: 'present' | 'absent';
  mood?: 'good' | 'neutral' | 'bad';
  isSpeaker?: boolean;
}