import { TextClient, textPropConfig, textBusinessConfig, textInit, textSchemaJson } from '@anfu/text';
import { PageClient, pagePropConfig, pageBusinessConfig, pageInit, pageSchemaJson } from '@anfu/page';
import { ContainerClient, containerPropConfig, containerBusinessConfig, containerInit, containerSchemaJson } from '@anfu/container';

const importMap: Record<string, any> = {
	container: {
		component: ContainerClient,
		prop: containerPropConfig,
		business: containerBusinessConfig,
		initial: containerInit,
		schema: containerSchemaJson,
	},
	page: {
		component: PageClient,
		prop: pagePropConfig,
		business: pageBusinessConfig,
		initial: pageInit,
		schema: pageSchemaJson,
	},
	text: {
		component: TextClient,
		prop: textPropConfig,
		business: textBusinessConfig,
		initial: textInit,
		schema: textSchemaJson,
	},
};

const getImport = (name: string, key: string) => {
	return importMap[name][key];
};

export { importMap, getImport };
