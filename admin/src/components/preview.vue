<template>
  <div class="lowcode-preview">
    <div class="lowcode-preview-head">
      <div class="lowcode-preview-head-text">{{ title }}</div>
    </div>
    <div class="lowcode-preview-body overflow-y-auto" @dragover="handleDragOver" @drop="handleDrop">
      <div v-for="item in json.children" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';

defineOptions({
	name: 'PreviewArea',
});

const store = useStore();
const { json } = storeToRefs(store);
const title = '预览';

const handleDragOver = (event: DragEvent) => {
	event.preventDefault();
};

const handleDrop = async (event: DragEvent) => {
	event.preventDefault();
	const data = event.dataTransfer?.getData('text/plain');

	// @ts-ignore
	// const res = await import('https://unpkg.com/@anfu/text?module')
	// console.log(res.textUiConfig)

	store.$patch({
		json: {
			...json.value,
			children: [...json.value.children, data],
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

  &-head {
    flex-shrink: 0;
    height: 88px;
    padding-top: 50px;
    text-align: center;
    background: #fff url('@/assets/status_bar.png') no-repeat top center/contain;
    border-bottom: 1px solid oklch(92.8% 0.006 264.531);

    &-text {
      width: 50%;
      margin: 0 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &-body {
    flex: 1;
    padding: 20px 16px 20px 16px;

    &::-webkit-scrollbar {
      display: none;
      opacity: 0;
    }
  }
}
</style>
