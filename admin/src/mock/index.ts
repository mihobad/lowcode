import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const mock = new AxiosMockAdapter(axios);

const BASE_URL = 'http://localhost:3001';

mock.onGet(`${BASE_URL}/api/pages/list`).reply(() => {
	return [
		200,
		{
			retcode: 0,
			data: {
				total: 20,
				list: [
					{
						id: 1,
						page_id: 'page_001',
						status: 1,
						description: '首页核心功能配置（轮播图、导航栏）',
						page_name: '首页配置',
						json: '{"layout":"grid","widgets":[{"type":"banner","position":"top"}]}',
						created_at: '2024-01-01 08:00:00',
					},
					{
						id: 2,
						page_id: 'page_002',
						status: 0,
						description: '用户信息展示与编辑页面（草稿）',
						page_name: '用户中心配置',
						json: '{"layout":"tabs","tabs":[{"name":"个人信息","content":""}]}',
						created_at: '2024-01-02 09:30:00',
					},
					{
						id: 3,
						page_id: 'page_003',
						status: 1,
						description: '商品详情展示（含图片、价格、评论）',
						page_name: '商品详情页配置',
						json: '{"layout":"vertical","sections":[{"type":"image"},{"type":"price"}]}',
						created_at: '2024-01-03 10:15:00',
					},
					{
						id: 4,
						page_id: 'page_004',
						status: 1,
						description: '订单列表与筛选功能配置',
						page_name: '订单列表页配置',
						json: '{"layout":"table","columns":[{"key":"orderNo","label":"订单号"}]}',
						created_at: '2024-01-04 14:20:00',
					},
					{
						id: 5,
						page_id: 'page_005',
						status: 0,
						description: '购物车商品管理（草稿未发布）',
						page_name: '购物车页配置',
						json: '{"layout":"list","items":[{"key":"product","label":"商品"}]}',
						created_at: '2024-01-05 15:45:00',
					},
					{
						id: 6,
						page_id: 'page_006',
						status: 1,
						description: '用户个人资料编辑页',
						page_name: '个人信息页配置',
						json: '{"layout":"form","fields":[{"key":"name","label":"姓名"}]}',
						created_at: '2024-01-06 16:00:00',
					},
					{
						id: 7,
						page_id: 'page_007',
						status: 0,
						description: '营销活动专题页（待审核）',
						page_name: '营销活动页配置',
						json: '{"layout":"flex","items":[{"type":"promotion"}]]}',
						created_at: '2024-01-07 17:10:00',
					},
					{
						id: 8,
						page_id: 'page_008',
						status: 1,
						description: '客服咨询入口与常见问题配置',
						page_name: '客服中心页配置',
						json: '{"layout":"grid","widgets":[{"type":"contact"}]}',
						created_at: '2024-01-08 18:30:00',
					},
					{
						id: 9,
						page_id: 'page_009',
						status: 1,
						description: '搜索结果展示与排序配置',
						page_name: '搜索结果页配置',
						json: '{"layout":"list","filters":[{"key":"price","label":"价格"}]}',
						created_at: '2024-01-09 19:45:00',
					},
					{
						id: 10,
						page_id: 'page_010',
						status: 0,
						description: '支付成功提示与跳转配置（草稿）',
						page_name: '支付成功页配置',
						json: '{"layout":"center","content":"支付成功！"}',
						created_at: '2024-01-10 20:00:00',
					},
				],
			},
		},
	];
});
