<template>
	<div class="lowcode-preview">
		<div class="lowcode-preview-body overflow-y-auto" @dragover="handleDragOver" @drop="handleDrop"
			@mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
			<RenderComponent :json="json" />
			<PointerHover :position="hoverPosition" v-if="isHover"/>
			<!-- <PointerResize /> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import RenderComponent from './render-component.vue';
import PointerHover from './pointer-hover.vue';
// import PointerResize from './pointer-resize.vue';
import { findParentAttr, generateRandomString, loadAnfuScript } from '@/utils';

defineOptions({
	name: 'PreviewArea',
});

const store = useStore();
const { json } = storeToRefs(store);
const isHover = ref(false);
const hoverPosition = ref({
	x: 0,
	y: 0,
	width: 0,
	height: 0,
});

const handleMouseMove = (event: MouseEvent) => {
	const target = event.srcElement! as HTMLElement;
	const rect = target.getBoundingClientRect();
	const rootDom = document.querySelector('.lowcode-preview-body') as HTMLElement;
	const { top, left } = rootDom.getBoundingClientRect();
	const scale = +(findParentAttr(rootDom, 'data-scale') || 1);
	hoverPosition.value.x = rect.left - left;
	hoverPosition.value.y = rect.top - top;
	hoverPosition.value.width = rect.width / scale;
	hoverPosition.value.height = rect.height / scale;
	isHover.value = true;
};

const handleMouseLeave = () => {
	hoverPosition.value.x = 0;
	hoverPosition.value.y = 0;
	hoverPosition.value.width = 0;
	hoverPosition.value.height = 0;
	isHover.value = false;
};

const handleDragOver = (event: DragEvent) => {
	event.preventDefault();
	console.log(event);
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
