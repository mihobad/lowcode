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
	json: Record<string, any>;
	oldJson: string;
	currentId: string;
	current: ComponentJson | null;
}

interface Getter {
	pane: Record<string, any>;
}

export const useStore = defineStore('store', {
	state: (): State => ({
		json: {},
		oldJson: '',
		currentId: '',
		current: null,
	}),
	getters: {
		pane: (state: State): Getter['pane'] => {
			const { type, version } = state.current || {};
			if (type && version) {
				return window[`${type}_${version.replace(/\./g, '_')}`];
			}

			return {};
		},
	},
});
