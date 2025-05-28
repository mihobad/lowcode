import { TextClient, textPropConfig, textBusinessConfig, textInit, textSchemaJson } from '@anfu/text';

const importMap = {
	text: {
		component: TextClient,
		prop: textPropConfig,
		business: textBusinessConfig,
		initial: textInit,
		schema: textSchemaJson,
	},
};

export default importMap;
