import { ContainerStyleConfig, PositionConfig } from '@anfu/preset';

const config: { label: string; items: any[] }[] = [
	{
		label: '位置',
		items: [...PositionConfig],
	},
	{
		label: '尺寸',
		items: [
			{
				label: '宽度',
				name: 'width',
				defaultValue: {
					type: '1',
					value: 300,
				},
				setter: {
					name: 'SizeSetter',
				},
			},
			{
				label: '高度',
				name: 'height',
				defaultValue: {
					type: '1',
					value: 100,
				},
				setter: {
					name: 'SizeSetter',
				},
			},
		],
	},
	{
		label: '容器样式',
		items: [...ContainerStyleConfig(false)],
	},
];

export default config;
