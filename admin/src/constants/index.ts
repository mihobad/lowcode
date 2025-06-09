export const CompStatus = [
	{
		value: 1,
		label: '上架',
	},
	{
		value: 0,
		label: '下架',
	},
];

// 默认JSON配置
export const DefaultJson = JSON.stringify({});

// 组件列表
export const CompList = [
	{
		id: 1,
		label: '容器',
		value: 'container',
		icon: new URL('@/assets/container_icon.jpg', import.meta.url).href,
		defaultJson: null,
	},
	{
		id: 2,
		label: '文本',
		value: 'text',
		icon: new URL('@/assets/text_icon.jpg', import.meta.url).href,
		defaultJson: null,
	},
	{
		id: 4,
		label: '图片',
		value: 'picture',
		icon: new URL('@/assets/image_icon.jpg', import.meta.url).href,
		defaultJson: null,
	},
];
