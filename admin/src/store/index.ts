import { defineStore } from 'pinia';

export interface ComponentProps {
	id: string;
	name: string;
	type: string;
	version: string;
	description: string;
	props: Record<string, any>;
	data: Record<string, any>;
	events: Record<string, any>;
	group: boolean;
}

export interface ComponentJson extends ComponentProps {
	children?: Array<ComponentJson>;
}

interface State {
	currentId: string;
	json: Record<string, any>;
	oldJson: string;
	current: ComponentJson | null;
}

export const useStore = defineStore('store', {
	state: (): State => ({
		currentId: '',
		json: {},
		oldJson: '',
		current: null,
	}),
	getters: {},
});
