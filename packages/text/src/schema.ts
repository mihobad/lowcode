// Schema 扩展默认值相关处理
import propConfig from './merchant/prop-config/index';
import { mapProps } from '@anfu/utils';

const textSchemaJson = {
	name: 'text',
	version: '1.0.0',
	description: 'text',
	props: mapProps(propConfig),
	data: {},
	events: {},
};

export { textSchemaJson };
