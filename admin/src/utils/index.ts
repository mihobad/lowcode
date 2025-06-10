import { type ComponentJson } from '../store';

export * from './umd';

// array -> map
export const arr2map = (arr: Record<string, any>[], key: string = 'value', valueKey: string = 'label') => {
	return arr.reduce(
		(acc, item) => {
			if (`${item[key]}` && `${item[valueKey]}`) {
				acc[`${item[key]}`] = item[valueKey];
			}
			return acc;
		},
		{} as Record<string, any>,
	);
};

// 生成随机英文和数字的组合，长度 10
export const generateRandomString = (length = 10) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}
	return result;
};

// load img
export const loadImg = (url: string) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve(img);
		};
		img.onerror = (e) => {
			reject(e);
		};
		img.src = url;
	});
};

// page -> Page
export const toPascalCase = (str: string) => {
	return str.replace(/(^|[-_])(\w)/g, (_, p1, p2) => {
		return p2.toUpperCase();
	});
};

// 过滤掉 -- 开头的属性
export const filterCssVariables = (obj: Record<string, any>) => {
	return Object.keys(obj).reduce(
		(acc, key) => {
			if (!key.startsWith('--')) {
				acc[key] = obj[key];
			}
			return acc;
		},
		{} as Record<string, any>,
	);
};

// 深度遍历查找当前组件
export const findComponent = (id: string, json: ComponentJson): ComponentJson => {
	if (json.id === id) {
		return json;
	}

	if (json.children) {
		for (const child of json.children) {
			const result = findComponent(id, child);
			if (result) {
				return result;
			}
		}
	}

	return json;
};

// updateJson
export const updateJson = (json: ComponentJson, id: string, update: Partial<ComponentJson>): ComponentJson => {
	if (json.id === id) {
		return { ...json, ...update };
	}

	if (!json.children) return json;

	const updatedChildren = json.children.map((child) => updateJson(child, id, update));

	return { ...json, children: updatedChildren };
};

// findElementParent data-id="xxx"
export const findDataId = (element: HTMLElement) => {
	let parent = element.parentElement;
	while (parent) {
		if (parent.hasAttribute('data-id')) {
			return parent.getAttribute('data-id');
		}
		parent = parent.parentElement;
	}
	return element.getAttribute('data-id');
};
