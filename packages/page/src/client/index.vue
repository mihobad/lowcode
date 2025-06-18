<template>
  <div :style="style" :data-component-id="json.id">
	<slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { generateContainerStyle, generateLayoutStyle } from '@anfu/utils';

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
		'min-height': '667px',
		...generateContainerStyle(json?.props),
		...generateLayoutStyle(json?.props),
	};
});
</script>

<style scoped lang="scss"></style>