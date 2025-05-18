<template>
  <div class="input-setter">
    <el-input
      v-model="modelValue"
      :maxlength="maxLength"
      :show-word-limit="showWordLimit"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'InputSetter',
});

interface Props {
	maxLength?: number;
	showWordLimit?: boolean;
	type?: 'text' | 'textarea';
	placeholder?: string;
}

withDefaults(defineProps<Props>(), {
	maxLength: 100,
	showWordLimit: true,
	type: 'text',
	placeholder: '请输入',
});

const modelValue = defineModel<string>();
</script>
