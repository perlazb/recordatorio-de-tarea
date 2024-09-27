import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import TaskManager from '../components/TaskManager.vue';


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/task',
    name: 'TaskManager',
    component: TaskManager,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
