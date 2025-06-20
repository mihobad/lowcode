import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash-es';
import { findComponent } from '@/utils';

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
	json: ComponentJson;
	current: ComponentJson | null;
	currentId: string;
}

interface Getter {
	pane: Record<string, any>;
}

export const useStore = defineStore('store', {
	state: (): State => ({
		json: {} as ComponentJson,
		current: null,
		currentId: '',
	}),
	getters: {
		pane: (state: State): Getter['pane'] => {
			const { type, version } = state.current || {};
			if (type && version) {
				return window[`${type}_${version.replace(/\./g, '_')}`];
			}

			return {};
		},
		pageId: (state: State): string => {
			return state.json.id;
		},
	},
	actions: {
		setCurrentComponent(id: string) {
			this.currentId = id;
			this.current = findComponent(id, this.json);
		},
		addComponent(component: ComponentJson) {
			if (!this.json.children) {
				this.json.children = [];
			}
			this.json.children.push(component);
			this.setCurrentComponent(component.id);
		},
	},
});

// const store = useStore();

// store.$subscribe((mutation, { current, json }) => {
// 	const { type } = mutation;
// 	const { id } = current || {};
// 	if (type === 'direct') {
// 		updateJson(json, id!, cloneDeep(current!));
// 	}
// });
