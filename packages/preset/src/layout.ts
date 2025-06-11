export const LayoutConfig = [
	{
		label: '排列方向',
		name: 'flow',
		defaultValue: 'column',
		setter: {
			name: 'TabRadioSetter',
			props: {
				options: [
					{
						label: '纵向',
						value: 'column',
					},
					{
						label: '横向',
						value: 'row',
					},
					{
						label: '换行',
						value: 'wrap',
					},
				],
			},
		},
	},
	{
		label: '元素间距',
		name: 'gapType',
		defaultValue: 'fixed',
		setter: {
			name: 'TabRadioSetter',
			props: {
				options: [
					{
						label: '固定',
						value: 'fixed',
					},
					{
						label: '自动',
						value: 'auto',
					},
				],
			},
		},
	},
	{
		label: '间距',
		name: 'gap',
		defaultValue: 16,
		setter: {
			name: 'NumberSetter',
			condition({ props }: any) {
				return props?.gapType === 'fixed';
			},
			props: {},
		},
	},
	{
		label: '元素分布',
		name: 'justify',
		defaultValue: ['flex-start', 'flex-start'],
		setter: {
			name: 'LayoutSetter',
		},
	},
];
