<template>
  <div class="number-setter w-full">
    <el-input-number
        v-model="modelValue"
        :min="min"
        :max="max"
        :step="step"
        :size="size"
        :step-strictly="stepStrictly"
        :disabled="disabled"
        :placeholder="placeholder"
        controls-position="right"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineModel } from 'vue';

const modelValue = defineModel<number>({
	default: 0, // 默认值为0
});

// 其他配置 props
const props = defineProps({
	min: {
		type: Number,
		default: -Infinity, // 默认无最小值限制
	},
	max: {
		type: Number,
		default: Infinity, // 默认无最大值限制
	},
	step: {
		type: Number,
		default: 1, // 步长默认1
	},
	stepStrictly: {
		type: Boolean,
		default: false, // 默认不严格按步长限制
	},
	disabled: {
		type: Boolean,
		default: false, // 默认不禁用
	},
	size: {
		type: String,
		default: 'default', // 默认大小
	},
	placeholder: {
		type: String,
		default: '请输入数值', // 占位提示
	},
});
</script>

<style scoped lang="scss">
.number-setter {
  :deep(.el-input-number) {
    width: 100% !important;
    display: block !important;
  }
}
</style>