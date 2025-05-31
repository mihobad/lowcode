import { type ComponentJson } from '../store';

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
