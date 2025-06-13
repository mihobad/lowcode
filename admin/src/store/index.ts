import { defineStore } from 'pinia';
import { updateJson } from '@/utils';
import { cloneDeep } from 'lodash-es';

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
	oldJson: string;
	current: ComponentJson | null;
}

interface Getter {
	pane: Record<string, any>;
}

export const useStore = defineStore('store', {
	state: (): State => ({
		json: {} as ComponentJson,
		oldJson: '',
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
		pageId: (state: State): string => {
			return state.json.id;
		},
		currentId: (state: State): string => {
			return state.current?.id || '';
		},
	},
});

const store = useStore();

store.$subscribe((mutation, { current, json }) => {
	const { type } = mutation;
	const { id } = current || {};
	if (type === 'direct') {
		updateJson(json, id!, cloneDeep(current!));
	}
});
