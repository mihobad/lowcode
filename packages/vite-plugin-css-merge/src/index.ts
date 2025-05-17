export default function styleMerge() {
	return {
		name: 'styleMerge',

		generateBundle(_: any, bundle: any) {
			// 收集所有 CSS 资源内容
			const cssContents: string[] = [];
			const cssAssetKeys: string[] = []; // 用于跟踪 CSS 资源的键名, 可以用于后续删除

			// 遍历 bundle 筛选 CSS 资源
			Object.entries(bundle).forEach(([key, asset]: any[]) => {
				if (asset.type === 'asset' && asset.fileName.endsWith('.css')) {
					cssContents.push(`/*${asset.fileName}*/ ${asset.source.toString()}`);
					cssAssetKeys.push(key);
				}
			});

			// 合并 CSS 内容（按遍历顺序拼接）
			const mergedCss = cssContents
				.join('\n')
				.replace(/\/\*(\$vite\$:.*?)\*\//g, '');

			// 添加合并后的 index.css 到 bundle
			bundle['index.css'] = {
				type: 'asset',
				fileName: 'index.css',
				source: mergedCss,
			};
		},
	};
}
