import { app } from '@/main';

const scripts = new Set();

export const loadScript = (name: any, version: string = 'latest') => {
	return new Promise((resolve, reject) => {
		const _name: any = `${name}${version}`;
		const pkg_name: any = `@anfu/${name}`;
		if (window[_name]) {
			resolve(window[_name]);
			return;
		}

		if (!scripts.has(name)) {
			const script = document.createElement('script');
			script.src = `https://unpkg.com/@anfu/${name}@${version}/dist/umd/index.umd.js`;
			script.async = true;
			script.onload = () => {
				app.component(`${_name}`, (window[pkg_name] as any)['default']);
				window[_name] = window[pkg_name];
				window[pkg_name] = null as any;
				resolve(window[_name]);
			};
			script.onerror = (e) => {
				reject(e);
			};
			document.head.appendChild(script);
		}
	});
};

export const loadStyle = (name: string) => {};
