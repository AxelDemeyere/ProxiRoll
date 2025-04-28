<script setup lang="ts">
import type { Participant } from '../types/participant';

defineProps<{
  participants: Participant[];
  speaker: Participant | null;
}>();

const getMoodEmoji = (mood?: 'good' | 'neutral' | 'bad') => {
  switch (mood) {
    case 'good': return '😊';
    case 'neutral': return '😐';
    case 'bad': return '😟';
    default: return '–';
  }
};

const getStatusIcon = (status?: 'present' | 'absent' | 'réunion' | 'école') => {
  switch (status) {
    case 'present': return '✓';
    case 'absent': return '✗';
    case 'réunion': return '🗓️';
    case 'école': return '🏫';

    default: return '–';
  }
};
</script>

<template>
  <div class="daily-summary">
    <h3>Récapitulatif du Daily</h3>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Participant</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Humeur</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="participant in participants" :key="participant.id">
            <td>{{ participant.name }}</td>
            <td>{{ participant.isSpeaker ? 'Speaker' : 'Participant' }}</td>
            <td :class="{ 
              'status-present': participant.status === 'present',
              'status-absent': participant.status === 'absent',
              'status-reunion': participant.status === 'réunion',
              'status-ecole': participant.status === 'école'
            }">
              {{ getStatusIcon(participant.status) }}
            </td>
            <td>{{ getMoodEmoji(participant.mood) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.daily-summary {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #d2d2d7;
}

.table-container {
  margin-top: 1rem;
  border-radius: 12px;

  border: 1px solid #d2d2d7;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #d2d2d7;
}

th {
  background-color: #f5f5f7;
  font-weight: 500;
  color: #1d1d1f;
}

tr:last-child td {
  border-bottom: none;
}

td.status-present {
  color: #34c759;
  font-weight: 600;
}

td.status-absent {
  color: #ff3b30;
  font-weight: 600;
}
</style>