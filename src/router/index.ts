import { createRouter, createWebHistory } from 'vue-router';
import DailyView from '../views/DailyView.vue';
import ParticipantListsView from '../views/ParticipantListsView.vue';
import ParticipantsView from '../views/ParticipantsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'daily',
      component: DailyView
    },
    {
      path: '/lists',
      name: 'lists',
      component: ParticipantListsView
    },
    {
      path: '/participants',
      name: 'participants',
      component: ParticipantsView
    }
  ]
});

export default router;