// Schema 扩展默认值相关处理
import propConfig from './merchant/prop-config/index';
import { mapProps } from '@anfu/utils';
import { version } from '../package.json';

const containerSchemaJson = {
	name: 'container',
	type: 'container',
	version: version,
	description: 'container',
	group: true,
	props: mapProps(propConfig),
	data: {},
	events: {},
};

export { containerSchemaJson };
