const backgroundColor = {
	label: '填充',
	name: 'backgroundColor',
	defaultValue: '#fff',
	setter: {
		name: 'ColorSetter',
	},
};

const radius = {
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
};

const inner = {
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
};

const outer = {
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
};

const border = {
	label: '边框',
	name: 'border',
	full: true,
	defaultValue: {
		none: true,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#fff',
	},
	setter: {
		name: 'BorderStyleSetter',
	},
};

const overflow = {
	label: '溢出',
	name: 'overflow',
	defaultValue: 'visible',
	setter: {
		name: 'TabRadioSetter',
		props: {
			options: [
				{
					label: '可见',
					value: 'visible',
				},
				{
					label: '隐藏',
					value: 'hidden',
				},
				{
					label: '滚动',
					value: 'auto',
				},
			],
		},
	},
};

export const ContainerStyleConfig = (isPage: boolean) => {
	return isPage ? [backgroundColor, radius, inner, border] : [backgroundColor, radius, inner, outer, border, overflow];
};
