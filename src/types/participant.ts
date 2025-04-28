export interface Participant {
  id: string;
  name: string;
  status?: 'present' | 'absent' | 'réunion' | 'école';
  mood?: 'good' | 'neutral' | 'bad';
  isSpeaker?: boolean;
}