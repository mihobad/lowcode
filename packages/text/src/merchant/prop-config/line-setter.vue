<template>
    <div class="line-setter w-full">
        <div class="flex justify-end">
            <el-switch v-model="modelValue"></el-switch>
        </div>
        <div v-if="modelValue" class="line-setter-input">
            <el-input-number v-model="line" :min="1" controls-position="right" @change="handleChange"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const modelValue = defineModel<boolean>();
const { maxLine, json } = defineProps({
	maxLine: {
		type: Number,
		default: 1,
	},
	json: {
		type: Object,
		default: {},
	},
});

const emit = defineEmits(['post-message']);
const line = ref(maxLine);

console.log(json);
const handleChange = (value: number | undefined) => {
	emit('post-message', {
		type: 'props',
		data: {
			maxLine: value,
		},
	});
};
</script>

<style lang="scss" scoped>
    .line-setter-input {
        :deep(.el-input-number) {
            width: 100% !important;
            display: block !important;
        }
    }
</style>