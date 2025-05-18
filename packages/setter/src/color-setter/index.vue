<template>
  <div class="color-setter">
    <el-color-picker v-model="modelValue" show-alpha :id="id"/>
  </div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'ColorSetter',
});

const { id } = defineProps({
	id: String,
});

const modelValue = defineModel<string>();
</script>
