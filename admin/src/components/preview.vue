<template>
  <div class="lowcode-preview">
    <div class="lowcode-preview-body overflow-y-auto" @dragover="handleDragOver" @drop="handleDrop">
      <RenderComponent :json="json"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import RenderComponent from './render-component.vue';
import { generateRandomString, loadAnfuScript } from '@/utils';
import { ref } from 'vue';

defineOptions({
	name: 'PreviewArea',
});

const store = useStore();
const { json } = storeToRefs(store);
let flag = ref(false);

const handleDragOver = (event: DragEvent) => {
	event.preventDefault();
};

const handleDrop = async (event: DragEvent) => {
	event.preventDefault();
	const name = event.dataTransfer?.getData('text/plain');

	const res = await loadAnfuScript(`${name}`);
	flag.value = true;

	const randomStr = generateRandomString(8);
	const _id = randomStr;
	const _json = {
		id: _id,
		...res[`${name}SchemaJson`],
	};
	store.$patch({
		currentId: _id,
		json: {
			...json.value,
			children: [...json.value.children, res[`${name}SchemaJson`]],
		},
		current: _json,
	} as any);
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
