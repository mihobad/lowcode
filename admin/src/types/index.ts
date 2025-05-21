export type Search = {
	name?: string;
	status?: string;
};

export type TableData = {
	id: number;
	componentId: string;
	title: string;
	status: number;
	type: 'text';
	createBy: string;
};
