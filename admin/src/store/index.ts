import { defineStore } from 'pinia';
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
	isDragging: boolean;
	draggedComponentType: string;
	tabName: string;
}

interface Getter {
	pane: Record<string, any>;
}

export const useStore = defineStore('store', {
	state: (): State => ({
		json: {} as ComponentJson,
		current: null,
		currentId: '',
		isDragging: false,
		draggedComponentType: '',
		tabName: 'left-pane-list',
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
			const foundComponent = findComponent(id, this.json);

			if (foundComponent) {
				this.current = foundComponent;
			} else {
				console.warn('Component not found:', id);
			}
		},
		addComponent(component: ComponentJson) {
			if (!this.json.children) {
				this.json.children = [];
			}
			this.json.children.push(component);
			this.setCurrentComponent(component.id);
		},
		updateCurrentComponent(update: Partial<ComponentJson>) {
			if (this.current && this.currentId) {
				Object.assign(this.current, update);
			}
		},
		// 添加组件到指定组件的children中（嵌套）
		addComponentToChildren(component: ComponentJson, parentId: string) {
			const parentComponent = findComponent(parentId, this.json);
			if (!parentComponent) {
				console.warn('Parent component not found:', parentId);
				return false;
			}

			// 检查父组件是否支持嵌套（容器组件）
			if (!parentComponent.group) {
				console.warn('Cannot add component to non-container component:', parentComponent.name);
				return false;
			}

			if (!parentComponent.children) {
				parentComponent.children = [];
			}
			parentComponent.children.push(component);
			this.setCurrentComponent(component.id);
			return true;
		},
		// 添加组件到指定组件的同级位置
		addComponentToSibling(component: ComponentJson, targetId: string, position: 'before' | 'after' = 'after') {
			// 递归查找目标组件及其父组件
			const findComponentWithParent = (
				current: ComponentJson,
				parent: ComponentJson | null = null,
			): { target: ComponentJson; parent: ComponentJson | null } | null => {
				if (current.id === targetId) {
					return { target: current, parent };
				}

				if (current.children) {
					for (const child of current.children) {
						const result = findComponentWithParent(child, current);
						if (result) return result;
					}
				}

				return null;
			};

			const result = findComponentWithParent(this.json);
			if (!result) {
				console.warn('Target component not found:', targetId);
				return false;
			}

			const { parent } = result;

			// 如果是根组件，不能添加到同级
			if (!parent) {
				console.warn('Cannot add sibling to root component');
				return false;
			}

			if (!parent.children) {
				parent.children = [];
			}

			// 找到目标组件在父组件children中的索引
			const targetIndex = parent.children.findIndex((child) => child.id === targetId);
			if (targetIndex === -1) {
				console.warn('Target component not found in parent children');
				return false;
			}

			// 根据position插入到对应位置
			const insertIndex = position === 'before' ? targetIndex : targetIndex + 1;
			parent.children.splice(insertIndex, 0, component);

			this.setCurrentComponent(component.id);
			return true;
		},
	},
});
