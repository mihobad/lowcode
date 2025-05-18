<template>
  <el-switch v-model="modelValue" />
</template>

<script setup lang="ts">
import { defineModel } from 'vue';

const modelValue = defineModel<boolean>('modelValue', {
	default: false,
});
</script>
