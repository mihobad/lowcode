<template>
	<div class="lowcode-preview">
		<div class="lowcode-preview-body overflow-y-auto" @dragover="handleDragOver" @drop="handleDrop">
			<RenderComponent :json="json" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import RenderComponent from './render-component.vue';
import { generateRandomString, loadAnfuScript } from '@/utils';

defineOptions({
	name: 'PreviewArea',
});

const store = useStore();
const { json } = storeToRefs(store);

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
