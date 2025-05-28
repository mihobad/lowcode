import { defineStore } from 'pinia';

interface State {
	currentId: string;
	json: Record<string, any>;
	oldJson: string;
}

export const useStore = defineStore('store', {
	state: (): State => ({
		currentId: '',
		json: {},
		oldJson: '',
	}),
	getters: {},
});
