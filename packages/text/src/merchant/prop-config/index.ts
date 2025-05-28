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
				defaultValue: '300',
				setter: {
					name: 'SelectSetter',
					props: {
						options: [
							{
								label: '300',
								value: '300',
							},
							{
								label: '400',
								value: '400',
							},
							{
								label: '500',
								value: '500',
							},
							{
								label: '700',
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
					name: 'SelectSetter',
					props: {
						options: [
							{
								label: '左对齐',
								value: 'left',
							},
							{
								label: '居中对齐',
								value: 'center',
							},
							{
								label: '右对齐',
								value: 'right',
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
				name: 'maxLineEnable',
				defaultValue: false,
				setter: {
					component: LineSetter,
				},
			},
			{
				name: 'maxLine',
				defaultValue: 1,
				setter: {},
				condition: () => false,
			},
		],
	},
];

export default config;
