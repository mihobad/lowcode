<template>
  <div class="select-setter w-full">
    <el-select v-model="modelValue" :placeholder="placeholder" :clearable="clearable" :multiple="multiple">
      <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'SelectSetter',
});

interface Option {
	label: string;
	value: string | number;
}

interface Props {
	options: Option[];
	placeholder?: string;
	clearable?: boolean;
	multiple?: boolean;
}

withDefaults(defineProps<Props>(), {
	options: () => [],
	placeholder: '请选择',
	clearable: false,
	multiple: false,
});

// 使用 defineModel 进行双向绑定
const modelValue = defineModel<string | number | (string | number)[]>();
</script>