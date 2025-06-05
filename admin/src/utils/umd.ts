import { app } from '@/main';
import { qs } from '@anfu/utils';

const QS = qs();

export const loadAnfuScript = (name: any, version: string = 'latest'): Promise<any> => {
	console.log('loadAnfuScriptStart', name, version);
	return new Promise(async (resolve, reject) => {
		const pkgName: any = `@anfu/${name}`;

		let globalName: string = `${name}_${version.replace(/\./g, '_')}`;

		if (window[globalName]) {
			resolve(window[globalName]);
			return;
		}
		if (QS.DEV) {
			// 开发环境
			const devPkg = await import(`../../node_modules/@anfu/${name}`);
			const version = devPkg[`${name}SchemaJson`]['version'];
			app.component(`${globalName}`, devPkg['default']);
			window[globalName] = devPkg;
			window[`${name}_${version.replace(/\./g, '_')}`] = devPkg;
			resolve(window[globalName]);
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
