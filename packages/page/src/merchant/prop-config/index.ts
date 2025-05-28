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
				},
			},
		],
	},
];

export default config;
