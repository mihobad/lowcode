import { defineStore } from 'pinia';

interface State {
	json: Record<string, any>;
	oldJson: string;
}

export const useStore = defineStore('store', {
	state: (): State => ({
		json: {},
		oldJson: '',
	}),
	getters: {},
});
