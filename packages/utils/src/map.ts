export const mapProps = (uiConfig: any) => {
	return uiConfig
		.map((it: any) => it.items)
		.flat()
		.reduce((prev: any, current: any) => {
			prev[current.name] = current.defaultValue ?? null;
			return prev;
		}, {} as any);
};
