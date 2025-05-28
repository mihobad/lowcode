import { TextClient, textPropConfig, textBusinessConfig, textInit, textSchemaJson } from '@anfu/text';
import { PageClient, pagePropConfig, pageBusinessConfig, pageInit, pageSchemaJson } from '@anfu/page';

const importMap: Record<string, any> = {
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
