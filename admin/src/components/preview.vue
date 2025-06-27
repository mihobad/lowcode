<template>
	<div class="lowcode-preview">
		<div class="lowcode-preview-body overflow-y-auto"
			@mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @mousedown="handleMouseDown">
			<RenderComponent :json="json" />
			<PointerHover :position="hoverPosition" v-if="hoverVisible" />
			<PointerResize :position="resizePosition" v-if="currentId" @update:position="handlePositionUpdate" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import RenderComponent from './render-component.vue';
import PointerHover from './pointer-hover.vue';
import PointerResize from './pointer-resize.vue';
import { findComponentId, getComponentPosition } from '@/utils';

interface Position {
	x: number;
	y: number;
	width: number;
	height: number;
	id: string;
}

defineOptions({
	name: 'PreviewArea',
});

const store = useStore();
const { json, currentId, current } = storeToRefs(store);
const isHover = ref(false);
const hoverVisible = computed(() => {
	return isHover.value && hoverPosition.value.id !== currentId.value;
});
const hoverPosition = ref<Position>({
	id: '',
	x: 0,
	y: 0,
	width: 0,
	height: 0,
});
const resizePosition = ref<Position>({
	id: '',
	x: 0,
	y: 0,
	width: 0,
	height: 0,
});

watch(
	[currentId, current],
	async ([nv]) => {
		if (nv) {
			await nextTick();
			const position = getComponentPosition(nv);
			resizePosition.value = position;
		}
	},
	{ immediate: true, deep: true },
);

const handleMouseMove = (event: MouseEvent) => {
	const id = findComponentId(event);
	if (!id) return;
	const position = getComponentPosition(id);
	hoverPosition.value = position;
	isHover.value = true;
};

const handleMouseLeave = () => {
	isHover.value = false;
	hoverPosition.value = { id: '', x: 0, y: 0, width: 0, height: 0 };
};

const handleMouseDown = (event: MouseEvent) => {
	const id = findComponentId(event);
	if (!id) return;
	const position = getComponentPosition(id);
	resizePosition.value = position;
	store.setCurrentComponent(position.id);
};

const handlePositionUpdate = async (nv: Position) => {
	const { props } = current.value!;
	const updatedProps = {
		...props,
		position: {
			...props.position,
			top: nv.y,
			left: nv.x,
		},
		width: {
			type: '1',
			value: nv.width,
		},
		height: {
			type: '1',
			value: nv.height,
		},
	};

	// 使用store的更新方法
	store.updateCurrentComponent({
		props: updatedProps,
	});

	await nextTick();
	const position = getComponentPosition(nv.id!);
	resizePosition.value = position;
};
</script>

<style scoped lang="scss">
.lowcode-preview {
	width: 100%;
	height: 100%;
	background: #f9f9f9;
	display: flex;
	flex-direction: column;

	&-body {
		flex: 1;

		&::-webkit-scrollbar {
			display: none;
			opacity: 0;
		}
	}
}
</style>
