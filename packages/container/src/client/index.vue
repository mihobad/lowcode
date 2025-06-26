<template>
  <div :style="wrapperStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { generateContainerStyle, generatePositionStyle, generateSizeStyle, generateLayoutStyle } from '@anfu/utils';

defineOptions({
	name: 'ContainerClient',
	components: {},
});

const { json } = defineProps({
	json: {
		type: Object,
		required: true,
	},
});

const wrapperStyle = computed(() => {
	const props = json.props || {};

	return {
		...generateContainerStyle(props),
		...generateSizeStyle(props.width, 'width'),
		...generateSizeStyle(props.height, 'height'),
		...generateLayoutStyle(props),
		...generatePositionStyle(props),
	};
});
</script>

<style scoped lang="scss"></style>