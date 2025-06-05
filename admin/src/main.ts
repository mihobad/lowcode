import { createApp } from 'vue';
import * as Vue from 'vue';
import { router } from './router';
import { createPinia } from 'pinia';
import * as Icons from '@element-plus/icons-vue';
import './styles/style.css';
import './styles/var.scss';
import App from './App.vue';
import ElementPlus from 'element-plus';
import Setter from '@anfu/setter';

// mock
const mock = async () => {
	if (location.search.includes('mock=true')) {
		await import('@/mock');
	}
};
mock();
const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(ElementPlus);
app.use(Setter);
app.use(pinia);
for (const [key, component] of Object.entries(Icons)) {
	app.component(key, component);
}

window.Vue = Vue;
app.mount('#app');

export { app };
