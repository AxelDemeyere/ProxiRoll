import { createRouter, createWebHistory } from 'vue-router';
import DailyView from '../views/DailyView.vue';
import ParticipantListsView from '../views/ParticipantListsView.vue';

const router = createRouter({
  history: createWebHistory(),
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
    }
  ]
});

export default router;