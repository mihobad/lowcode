import { app } from '@/main';
import { qs } from '@anfu/utils';

const QS = qs();

export const loadAnfuScript = (name: any, version: string = 'latest'): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		const pkgName: any = `@anfu/${name}`;

		let globalName: string = `${name}_${version.replace(/\./g, '_')}`;

		if (window[globalName]) {
			resolve(window[globalName]);
			return;
		}
		if (QS.DEV) {
			// 开发环境
			const devPkg = await import(/* @vite-ignore */ `../../node_modules/@anfu/${name}`);
			await import(/* @vite-ignore */ `../../node_modules/@anfu/${name}/dist/es/index.css`);
			const _version = devPkg[`${name}SchemaJson`]['version'];
			const _globalName = `${name}_${_version.replace(/\./g, '_')}`;
			app.component(`${_globalName}`, devPkg['default']);
			window[_globalName] = devPkg;
			window[globalName] = devPkg;
			resolve(window[_globalName]);
			return;
		}
		const pkg = await fetch(`https://registry.npmjs.org/${pkgName}`);
		const pkg_json = await pkg.json();
		const latestVersion = pkg_json['dist-tags'].latest;
		const isLatest = version === 'latest' || version === latestVersion;

		if (version === 'latest') {
			globalName = `${name}_${latestVersion.replace(/\./g, '_')}`;
		}

		const script = document.createElement('script');
		script.src = `https://unpkg.com/@anfu/${name}@${version}/dist/umd/index.umd.js`;
		script.async = true;
		script.onload = () => {
			app.component(`${globalName}`, window[pkgName]['default']); // page_1_0_0
			window[globalName] = window[pkgName];
			if (isLatest) {
				window[`${name}_latest`] = window[pkgName];
			}
			window[pkgName] = null as any;
			resolve(window[globalName]);
		};
		script.onerror = (e) => {
			reject(e);
		};
		document.head.appendChild(script);
	});
};

export const loadStyle = (name: string) => {};
