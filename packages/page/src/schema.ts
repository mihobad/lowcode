// Schema 扩展默认值相关处理
import propConfig from './merchant/prop-config/index';
import { mapProps } from '@anfu/utils';
import { version } from '../package.json';

const pageSchemaJson = {
	name: 'page',
	type: 'page',
	version: version,
	description: 'page',
	props: mapProps(propConfig),
	data: {},
	events: {},
	group: true,
	children: [
		{
			name: 'text',
			type: 'text',
			version: '1.0.0',
			description: 'text',
		},
		{
			name: 'container',
			type: 'container',
			version: '1.0.0',
			description: 'container',
			group: true,
			children: [
				{
					name: 'text',
					type: 'text',
					version: '1.0.0',
					description: 'text',
				},
			],
		},
	],
};

export { pageSchemaJson };
