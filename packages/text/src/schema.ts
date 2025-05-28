// Schema 扩展默认值相关处理
import propConfig from './merchant/prop-config/index';
import { mapProps } from '@anfu/utils';
import { version } from '../package.json';

const textSchemaJson = {
	name: 'text',
	version: version,
	description: 'text',
	props: mapProps(propConfig),
	data: {},
	events: {},
};

export { textSchemaJson };
