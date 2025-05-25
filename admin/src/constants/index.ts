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
		label: '文本',
		value: 'text',
		icon: new URL('@/assets/text_icon.jpg', import.meta.url).href,
		defaultJson: null,
	},
	{
		id: 2,
		label: 'markdown',
		value: 'markdown',
		icon: new URL('@/assets/markdown_icon.jpg', import.meta.url).href,
		defaultJson: null,
	},
	{
		id: 3,
		label: '图片',
		value: 'image',
		icon: new URL('@/assets/image_icon.jpg', import.meta.url).href,
		defaultJson: null,
	},
];
