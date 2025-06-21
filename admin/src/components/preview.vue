<template>
	<div class="lowcode-preview">
		<div class="lowcode-preview-body overflow-y-auto" @dragover="handleDragOver" @drop="handleDrop"
			@mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @mousedown="handleMouseDown">
			<RenderComponent :json="json" />
			<PointerHover :position="hoverPosition" v-if="isHover" />
			<PointerResize :position="resizePosition" v-if="currentId"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import RenderComponent from './render-component.vue';
import PointerHover from './pointer-hover.vue';
import PointerResize from './pointer-resize.vue';
import { findParentAttr, generateRandomString, loadAnfuScript } from '@/utils';

defineOptions({
	name: 'PreviewArea',
});

const store = useStore();
const { json, currentId } = storeToRefs(store);
const isHover = ref(false);
const hoverPosition = ref({
	x: 0,
	y: 0,
	width: 0,
	height: 0,
});
const resizePosition = ref({
	x: 0,
	y: 0,
	width: 0,
	height: 0,
});

const getComponentPosition = (event: MouseEvent) => {
	const target = event.srcElement! as HTMLElement;
	const id = findParentAttr(target, 'data-component-id');
	if (!id) return null;

	const dom = document.querySelector(`[data-component-id="${id}"]`) as HTMLElement;
	const rect = dom.getBoundingClientRect();
	const rootDom = document.querySelector('.lowcode-preview-body') as HTMLElement;
	const { top, left } = rootDom.getBoundingClientRect();
	const scale = +(findParentAttr(rootDom, 'data-scale') || 1);

	return {
		x: rect.left - left,
		y: rect.top - top,
		width: rect.width / scale,
		height: rect.height / scale,
		id,
	};
};

const handleMouseMove = (event: MouseEvent) => {
	const position = getComponentPosition(event);
	if (position) {
		hoverPosition.value = position;
		isHover.value = true;
	}
};

const handleMouseLeave = () => {
	hoverPosition.value.x = 0;
	hoverPosition.value.y = 0;
	hoverPosition.value.width = 0;
	hoverPosition.value.height = 0;
	isHover.value = false;
};

const handleMouseDown = (event: MouseEvent) => {
	const position = getComponentPosition(event);
	if (position) {
		resizePosition.value = position;
		store.setCurrentComponent(position.id);
	}
};

const handleDragOver = (event: DragEvent) => {
	event.preventDefault();
};

const handleDrop = async (event: DragEvent) => {
	event.preventDefault();
	const name = event.dataTransfer?.getData('text/plain');

	const res = await loadAnfuScript(`${name}`);

	const randomStr = generateRandomString(8);
	const _id = randomStr;
	const _json = {
		id: _id,
		...res[`${name}SchemaJson`],
	};

	console.log('🚀 Adding component:', {
		type: _json.type,
		id: _id,
		beforeChildrenCount: json.value.children?.length || 0,
	});

	store.addComponent(_json);

	console.log('✅ Component added, after children count:', json.value.children?.length || 0);
	console.log('📍 Current component:', store.current?.type, store.current?.id);
};
</script>

<style scoped lang="scss">
.lowcode-preview {
	width: 100%;
	height: 100%;
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
