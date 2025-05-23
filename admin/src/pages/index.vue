<template>
    <div class="p-4">
        <el-form class="flex gap-12" :model="search" label-width="100px" label-position="top">
            <el-form-item label="页面名称" class="flex-1">
                <el-input v-model.trim="search.name" :maxlength="20" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="状态" class="flex-1">
                <el-select v-model="search.status" placeholder="请选择">
                    <el-option v-for="item in CompStatus" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="&nbsp;" class="flex-shrink-0 flex-1">
                <el-button plain @click="clkReset">重置</el-button>
                <el-button type="primary" @click="clkSearch">查询</el-button>
                <el-button type="primary" @click="clkCreate">新建</el-button>
            </el-form-item>
        </el-form>
        <el-divider />
        <el-table :data="tableData" border stripe class="mt-4">
            <el-table-column v-for="item in tableColumns" :key="item.prop" :label="item.label" :prop="item.prop">
                <template #default="scope">
                    <span v-if="item.prop === 'status'">{{ arr2map(CompStatus)[scope.row.status] }}</span>
                    <span v-else>{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template #default="scope">
                    <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button link type="primary" @click="handleStatus(scope.row)">
                        <span>{{ scope.row.status === 0 ? '上架' : '下架' }}</span>
                    </el-button>
					<el-button link type="primary" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="mt-4 flex justify-end">
            <el-pagination background layout="prev, pager, next" :total="pagination.total" :page-size="pagination.size"
                v-model:current-page="pagination.current" @change="clkSearch" />
        </div>
    </div>

	<Create v-model="createDialogVisible"/>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Search, TableData } from '@/types';
import { CompStatus } from '@/constants/index';
import { useRouter } from 'vue-router';
import { fetchPageList, fetchDeletePage, fetchUpdateStatus } from '@/api';
import { arr2map } from '@/utils';
import Create from '@/components/create.vue';

const router = useRouter();

const search = ref<Search>({
	name: '',
	status: undefined,
});
const pagination = reactive<{ current: number; size: number; total: number }>({
	total: 0,
	current: 1,
	size: 10,
});

const tableColumns = [
	{
		label: 'id',
		prop: 'id',
	},
	{
		label: '名称',
		prop: 'page_name',
	},
	{
		label: '描述',
		prop: 'description',
	},
	{
		label: '状态',
		prop: 'status',
	},
	{
		label: '创建时间',
		prop: 'created_at',
	},
];
const tableData = ref<TableData[]>([]);
const createDialogVisible = ref(false);

// 查询
const clkSearch = async () => {
	const { current, size } = pagination;
	const { name, status } = search.value;
	const { list, total } = await fetchPageList({
		params: {
			current: current,
			size: size,
			name,
			status,
		},
	});
	tableData.value = list || [];
	pagination.total = total;
};

clkSearch();

// 重置
const clkReset = () => {
	search.value = {
		name: '',
		status: undefined,
	};
	pagination.total = 0;
	pagination.current = 1;
	pagination.size = 10;
	clkSearch();
};

// 新建
const clkCreate = () => {
	createDialogVisible.value = true;
};

const handleDel = async (row: TableData) => {
	await fetchDeletePage({
		toastPending: true,
		data: {
			id: row.id,
		},
	});
	clkSearch();
};

// 编辑
const handleEdit = (row: TableData) => {
	router.push({
		name: 'edit-base',
		params: {
			id: row.id,
		},
	});
};

// 发布/下架
const handleStatus = async (row: TableData) => {
	await fetchUpdateStatus({
		toastPending: true,
		data: {
			id: row.id,
			status: row.status === 0 ? 1 : 0,
		},
	});
	clkSearch();
};
</script>

<style scoped lang="scss"></style>