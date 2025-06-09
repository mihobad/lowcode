// Schema 扩展默认值相关处理
import propConfig from './merchant/prop-config/index';
import { mapProps } from '@anfu/utils';
import { version } from '../package.json';

const pictureSchemaJson = {
	name: 'picture',
	version: version,
	description: 'picture',
	group: false,
	props: mapProps(propConfig),
	data: {},
	events: {},
};

export { pictureSchemaJson };
