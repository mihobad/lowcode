<template>
	<div :style="wrapperStyle">
		<div :style="textStyle" :class="[maxLineEnable && 'limit-line']">{{ json?.props?.value }}</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { generateContainerStyle, generateSizeStyle } from '@anfu/utils';

defineOptions({
	name: 'TextClient',
	components: {},
});

const { json } = defineProps({
	json: {
		type: Object,
		required: true,
	},
});

const maxLineEnable = computed(() => {
	return json.props?.maxLine?.enable;
});

const wrapperStyle = computed(() => {
	const props = json.props || {};
	const style: any = {
		...generateContainerStyle(props),
	};

	const { top, left, right, bottom, positionType, zIndex } = props.position || {};
	style.position = positionType || 'relative';
	if (positionType !== 'relative') {
		style.top = `${top ?? 0}px`;
		style.left = `${left ?? 0}px`;
		style.right = `${right ?? 0}px`;
		style.bottom = `${bottom ?? 0}px`;
	}
	style.zIndex = zIndex ?? 1;

	style.justifyContent = props.justifyContent || 'flex-start';
	style.fontSize = `${props.fontSize}px`;
	style.fontWeight = props.fontWeight;
	style.color = props.color;
	style.lineHeight = `${props.lineHeight}px`;
	style.letterSpacing = `${props.letterSpacing}px`;

	return {
		display: 'inline-flex',
		'flex-direction': 'column',
		'white-space': 'break-spaces',
		...style,
		...generateSizeStyle(props.width, 'width'),
		...generateSizeStyle(props.height, 'height'),
	};
});

const textStyle = computed(() => {
	const props = json.props || {};
	const style: any = {};

	style.fontFamily = 'inherit';
	style.textAlign = props.textAlign;

	const { maxLine } = props;
	if (maxLine?.enable) {
		style['-webkit-line-clamp'] = maxLine.value;
	}

	return {
		...style,
	};
});
</script>

<style scoped lang="scss">
.limit-line {
	-webkit-box-orient: vertical;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>