import { LayoutConfig, ContainerStyleConfig } from '@anfu/preset';

const config: { label: string; items: any[] }[] = [
	{
		label: '常用设置',
		items: [
			{
				label: '页面标题',
				name: 'title',
				defaultValue: '',
				setter: {
					name: 'InputSetter',
					props: {
						maxLength: 5,
					},
				},
			},
		],
	},
	{
		label: '布局',
		items: LayoutConfig,
	},
	{
		label: '容器样式',
		items: [...ContainerStyleConfig(true)],
	},
];

export default config;
