import axios, { type FetchConfig } from '@anfu/axios';

const API_BASE = 'http://localhost:3001/api/pages';

// 页面列表
export const fetchPageList = (config: FetchConfig = {}): Promise<any> => {
	return axios(`${API_BASE}/list`, {
		method: 'get',
		...config,
	});
};

// 图片上传
export const fetchUploadImage = (config: FetchConfig = {}): Promise<any> => {
	return axios(`${API_BASE}/upload/image`, {
		method: 'post',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		...config,
	});
};

// 新建页面
export const fetchCreatePage = (config: FetchConfig = {}): Promise<any> => {
	return axios(`${API_BASE}/create`, {
		method: 'post',
		...config,
	});
};
