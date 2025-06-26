import type { ComponentJson } from '@/store';

export const findParentAttr = (element: HTMLElement, attr: string) => {
	if (element.hasAttribute(attr)) {
		return element.getAttribute(attr);
	}
	let parent = element.parentElement;
	while (parent) {
		if (parent.hasAttribute(attr)) {
			return parent.getAttribute(attr);
		}
		parent = parent.parentElement;
	}
	return element.getAttribute(attr);
};

export const findComponentId = (event: MouseEvent): string => {
	const target = event.srcElement! as HTMLElement;
	const id = findParentAttr(target, 'data-component-id');
	return id || '';
};

export const getComponentPosition = (id: string) => {
	const dom = document.querySelector(`[data-component-id="${id}"]`) as HTMLElement;
	const rect = dom.getBoundingClientRect();
	const rootDom = document.querySelector('.lowcode-preview-body') as HTMLElement;
	const { top, left } = rootDom.getBoundingClientRect();
	const scale = +(findParentAttr(rootDom, 'data-scale') || 1);

	return {
		id,
		x: Math.max(0, rect.left - left),
		y: Math.max(0, rect.top - top),
		width: Math.max(10, rect.width / scale), // 最小宽度10px
		height: Math.max(10, rect.height / scale), // 最小高度10px
	};
};

export const findComponentById = (component: ComponentJson, id: string): ComponentJson | null => {
	if (component.id === id) {
		return component;
	}
	if (component.children) {
		for (const child of component.children) {
			const result = findComponentById(child, id);
			if (result) return result;
		}
	}
	return null;
};
