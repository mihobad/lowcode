export const ContainerStyleConfig = [
	{
		label: '填充',
		name: 'backgroundColor',
		defaultValue: '#fff',
		setter: {
			name: 'ColorSetter',
		},
	},
	{
		label: '圆角',
		name: 'radius',
		full: true,
		defaultValue: {
			borderRadius: 0,
			isMixed: false,
			topLeft: 0,
			topRight: 0,
			bottomLeft: 0,
			bottomRight: 0,
		},
		setter: {
			name: 'BorderRadiusSetter',
		},
	},
	{
		label: '内边距',
		name: 'inner',
		full: true,
		defaultValue: {
			padding: 0,
			paddingTop: 0,
			paddingRight: 0,
			paddingBottom: 0,
			paddingLeft: 0,
			isMixed: false,
		},
		setter: {
			name: 'PaddingSetter',
		},
	},
	{
		label: '外边距',
		name: 'outer',
		full: true,
		defaultValue: {
			margin: 0,
			marginTop: 0,
			marginRight: 0,
			marginBottom: 0,
			marginLeft: 0,
			isMixed: false,
		},
		setter: {
			name: 'MarginSetter',
		},
	},
];

export const generateContainerStyle = (style: any) => {
	return {
		backgroundColor: style.backgroundColor,
	};
};
