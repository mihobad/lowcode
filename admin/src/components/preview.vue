<template>
  <div class="lowcode-preview">
    <div class="lowcode-preview-body overflow-y-auto" @dragover="handleDragOver" @drop="handleDrop">
      <div v-for="item in json.children" :key="item">
        {{ item }}
        <component :is="comps.TextClient" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import { shallowRef } from 'vue';

defineOptions({
	name: 'PreviewArea',
});

const store = useStore();
const { json } = storeToRefs(store);

const handleDragOver = (event: DragEvent) => {
	event.preventDefault();
};

const comps = shallowRef<any>({});
const handleDrop = async (event: DragEvent) => {
	event.preventDefault();
	const name = event.dataTransfer?.getData('text/plain');

	console.log(name);

	store.$patch({
		json: {
			...json.value,
			children: [...json.value.children, name],
		},
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
