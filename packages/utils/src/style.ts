// container style
export const generateContainerStyle = (props: Record<string, any>) => {
	const style: Record<string, string> = {};

	const { backgroundColor, radius, inner, outer, border, overflow } = props;

	style.backgroundColor = backgroundColor;

	const { topLeft, topRight, bottomLeft, bottomRight } = radius;

	style.borderRadius = `${topLeft}px ${topRight}px ${bottomLeft}px ${bottomRight}px`;

	const { paddingTop, paddingRight, paddingBottom, paddingLeft } = inner;

	style.padding = `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;

	if (outer) {
		const { marginTop, marginRight, marginBottom, marginLeft } = outer;

		style.margin = `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`;
	}

	const { none, borderWidth, borderStyle, borderColor } = border;

	style.border = `${none ? 'none' : `${borderWidth}px ${borderStyle} ${borderColor}`}`;

	if (overflow) {
		style.overflow = overflow;
	}

	return style;
};

// layout style
export const generateLayoutStyle = (props: Record<string, any>) => {
	const style: Record<string, string> = {
		display: 'flex',
	};

	const { flow, gapType, gap, justify } = props;

	style.flexFlow = flow;

	if (flow === 'column') {
		// align-content, justify-content
		const [justifyContent, alignContent] = justify;
		style.placeContent = `${alignContent} ${justifyContent}`;
		style.alignItems = alignContent;
	} else {
		// align-content, justify-content
		const [alignContent, justifyContent] = justify;
		style.placeContent = `${alignContent} ${justifyContent}`;
		style.alignItems = alignContent;
	}

	if (gapType === 'fixed') {
		style.gap = `${gap}px`;
	} else {
		style.gap = 'unset';
		const [alignContent] = justify;
		style.placeContent = `${alignContent} space-between`;
		style.alignItems = alignContent;
	}

	return style;
};
