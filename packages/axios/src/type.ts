import type { AxiosRequestConfig } from 'axios';

export interface ResponseData<T = unknown> {
	retcode: string;
	data: T;
}

export interface ResponseException {
	retcode: string | number;
	message: string;
}

export interface FetchOptions {
	toastPending?: boolean | ToastOptions;
	toastError?: boolean | Omit<ToastOptions, 'message'>;
	errorMessageHandler?: (
		retcode: number | string,
		message: string,
	) => string | undefined;
}

export type FetchConfig = FetchOptions & Omit<AxiosRequestConfig, 'url'>;

export interface ToastOptions {
	type?: 'text' | 'loading' | 'mask';
	message?: string;
	duration?: number;
	position?: 'top' | 'middle' | 'bottom';
	forbidClick?: boolean;
	transparent?: boolean;
	once?: boolean;
}
