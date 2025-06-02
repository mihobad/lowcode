import { TextClient, textPropConfig, textBusinessConfig, textInit, textSchemaJson } from '@anfu/text';
import { PageClient, pagePropConfig, pageBusinessConfig, pageInit, pageSchemaJson } from '@anfu/page';
import { ContainerClient, containerPropConfig, containerBusinessConfig, containerInit, containerSchemaJson } from '@anfu/container';

const importMap: Record<string, any> = {
	container: {
		component: ContainerClient,
		props: containerPropConfig,
		data: containerBusinessConfig,
		initial: containerInit,
		schema: containerSchemaJson,
	},
	page: {
		component: PageClient,
		props: pagePropConfig,
		data: pageBusinessConfig,
		initial: pageInit,
		schema: pageSchemaJson,
	},
	text: {
		component: TextClient,
		props: textPropConfig,
		data: textBusinessConfig,
		initial: textInit,
		schema: textSchemaJson,
	},
};

const getImport = (name: string, key: string) => {
	return importMap[name][key];
};

// 导出所有组件 component [{ name: text, component: TextClient }]
const components = Object.keys(importMap).map((name) => {
	return {
		name,
		component: importMap[name].component,
	};
});

export { importMap, getImport, components };
