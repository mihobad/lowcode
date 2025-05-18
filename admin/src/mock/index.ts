import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const mock = new AxiosMockAdapter(axios);

mock.onGet('/api/user').reply(() => {
	return [
		200,
		{
			retcode: 0,
			data: {
				name: 'admin',
				token: 'admin',
			},
		},
	];
});
