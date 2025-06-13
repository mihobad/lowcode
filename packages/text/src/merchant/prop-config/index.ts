import { ContainerStyleConfig, PositionConfig } from '@anfu/preset';
import LineSetter from './line-setter.vue';

const config: { label: string; items: any[] }[] = [
	{
		label: '常用设置',
		items: [
			{
				label: '内容',
				name: 'value',
				defaultValue: '这是一段文本',
				setter: {
					name: 'InputSetter',
					props: {
						type: 'textarea',
						placeholder: '请输入文本内容',
						maxLength: 2000,
					},
				},
			},
			{
				label: '字号',
				name: 'fontSize',
				defaultValue: 12,
				setter: {
					name: 'NumberSetter',
					props: {
						min: 8,
					},
				},
			},
			{
				label: '字重',
				name: 'fontWeight',
				defaultValue: '400',
				setter: {
					name: 'SelectSetter',
					props: {
						options: [
							{
								label: '细体',
								value: '300',
							},
							{
								label: '常规',
								value: '400',
							},
							{
								label: '中等',
								value: '500',
							},
							{
								label: '粗体',
								value: '700',
							},
						],
					},
				},
			},
			{
				label: '字间距',
				name: 'letterSpacing',
				defaultValue: 0,
				setter: {
					name: 'NumberSetter',
					props: {
						min: 0,
					},
				},
			},
			{
				label: '行高',
				name: 'lineHeight',
				defaultValue: 16,
				setter: {
					name: 'NumberSetter',
					props: {
						min: 0,
					},
				},
			},
			{
				label: '水平对齐',
				name: 'textAlign',
				defaultValue: 'left',
				setter: {
					name: 'TabRadioSetter',
					props: {
						options: [
							{
								label: '左对齐',
								value: 'left',
								icon: new URL('./images/text-left.svg', import.meta.url).href,
							},
							{
								label: '居中对齐',
								value: 'center',
								icon: new URL('./images/text-center.svg', import.meta.url).href,
							},
							{
								label: '右对齐',
								value: 'right',
								icon: new URL('./images/text-right.svg', import.meta.url).href,
							},
							{
								label: '两端对齐',
								value: 'justify',
								icon: new URL('./images/text-justify.svg', import.meta.url).href,
							},
						],
					},
				},
			},
			{
				label: '垂直对齐',
				name: 'justifyContent',
				defaultValue: 'flex-start',
				setter: {
					name: 'TabRadioSetter',
					props: {
						options: [
							{
								label: '顶部对齐',
								value: 'flex-start',
								icon: new URL('./images/text-top.svg', import.meta.url).href,
							},
							{
								label: '居中对齐',
								value: 'center',
								icon: new URL('./images/text-middle.svg', import.meta.url).href,
							},
							{
								label: '底部对齐',
								value: 'flex-end',
								icon: new URL('./images/text-bottom.svg', import.meta.url).href,
							},
						],
					},
				},
			},
			{
				label: '颜色',
				name: 'color',
				defaultValue: '#000000',
				setter: {
					name: 'ColorSetter',
				},
			},
			{
				label: '最大行数',
				name: 'maxLine',
				defaultValue: {
					enable: false,
					value: 1,
				},
				setter: {
					component: LineSetter,
				},
			},
		],
	},
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
					type: '4',
					value: 100,
				},
				setter: {
					name: 'SizeSetter',
				},
			},
			{
				label: '高度',
				name: 'height',
				defaultValue: {
					type: '4',
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
