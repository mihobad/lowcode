import axios, { type FetchConfig } from '@anfu/axios';

const API_BASE = 'http://localhost:3001/api/pages';

// 页面列表
export const fetchPageList = (config: FetchConfig = {}): Promise<any> => {
	return axios(`${API_BASE}/list`, {
		method: 'get',
		...config,
	});
};
