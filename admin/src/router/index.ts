import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/pages/index.vue'),
	},
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
