import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/pages/index.vue'),
	},
	{
		path: '/design/:id',
		name: 'design',
		props: true,
		component: () => import('@/pages/design.vue'),
	},
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
