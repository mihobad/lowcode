<template>
	<div :style="wrapperStyle">
		<div :style="textStyle" :class="[maxLineEnable && 'limit-line']">{{ json?.props?.value }}</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { generateContainerStyle, generatePositionStyle, generateSizeStyle } from '@anfu/utils';

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
		...generatePositionStyle(props),
		...generateSizeStyle(props.width, 'width'),
		...generateSizeStyle(props.height, 'height'),
	};

	style.justifyContent = props.justifyContent || 'flex-start';
	style.fontSize = `${props.fontSize}px`;
	style.fontWeight = props.fontWeight;
	style.color = props.color;
	style.lineHeight = `${props.lineHeight}px`;
	style.letterSpacing = `${props.letterSpacing}px`;

	return {
		...style,
		display: 'inline-flex',
		'flex-direction': 'column',
		'white-space': 'break-spaces',
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