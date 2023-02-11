import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TagsView from '../views/TagsView.vue';
import SettingsView from '../views/SettingsView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/tags',
            name: 'tags',
            component: TagsView
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView
        }
    ]
});

export default router;
