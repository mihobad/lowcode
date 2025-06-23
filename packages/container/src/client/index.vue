<template>
  <div :style="wrapperStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { generateContainerStyle, generateSizeStyle } from '@anfu/utils';

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
	const style: any = {
		...generateContainerStyle(props),
		...generateSizeStyle(props.width, 'width'),
		...generateSizeStyle(props.height, 'height'),
	};

	const { top, left, right, bottom, positionType, zIndex } = props.position || {};
	style.position = positionType || 'relative';
	style.top = top || 0;
	style.left = left || 0;
	style.right = right || 0;
	style.bottom = bottom || 0;
	style.zIndex = zIndex || 1;

	return {
		...style,
	};
});
</script>

<style scoped lang="scss"></style>