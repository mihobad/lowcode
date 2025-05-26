// Schema 扩展默认值相关处理
import uiConfig from './merchant/ui-config/index';
import { mapProps } from '@anfu/utils';

const textSchemaJson = {
	name: 'text',
	version: '1.0.0',
	description: 'text',
	props: mapProps(uiConfig),
	data: {},
	events: {},
};

export { textSchemaJson };
