<template>
    <div class="size-setter">
        <el-select v-model="size.type">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input-number v-model="size.value" :controls="false" v-if="size.type === '1' || size.type === '2'" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = defineModel({
	type: Object,
	default: () => {
		return {
			type: '1', // 1 固定 2 百分比 3 填充容器 4 适应内容
			value: 100,
		};
	},
});

const typeOptions = ref([
	{
		label: '固定',
		value: '1',
	},
	{
		label: '百分比',
		value: '2',
	},
	{
		label: '填充容器',
		value: '3',
	},
	{
		label: '适应内容',
		value: '4',
	},
]);
</script>
<style lang="scss" scoped>
.size-setter {
    width: 100%;
    display: flex;
}
</style>