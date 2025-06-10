<template>
  <div :style="style">
	page
	<slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { generateContainerStyle } from '@anfu/utils';

defineOptions({
	name: 'PageClient',
	components: {},
});

const { json } = defineProps({
	json: {
		type: Object,
		required: true,
	},
});

const style = computed(() => {
	return {
		...generateContainerStyle(json?.props),
	};
});
</script>

<style scoped lang="scss"></style>