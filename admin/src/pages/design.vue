<template>
  <div class="p-4 h-full flex flex-col layout">
    <div class="flex justify-end">
      <el-button plain @click="clkBack">返回</el-button>
      <el-button type="primary" @click="clkSave">保存</el-button>
    </div>
    <div class="flex mt-2 pt-2 gap-2 flex-1">
      <div class="border-l border-gray-200 p-4 left-pane">
        <LeftPane />
      </div>
      <div class="flex-1 flex justify-center items-center center-pane relative" ref="dragContainer">
        <div class="relative w-full h-full origin-top-left" ref="dragCanvas" :style="transformStyle">
          <div class="absolute center-pane-wrapper" ref="dragTarget" :style="posStyle">
            <div ref="dragHandler">
              <PageTool />
            </div>
            <div class="iframe-container overflow-hidden">
              <ClientPreview />
            </div>
          </div>
        </div>
      </div>
      <RightPane />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ClientPreview from '@/components/preview.vue';
import { useStore } from '@/store';
import { fetchGetJson, fetchSaveJson } from '@/api';
import { ElMessage } from 'element-plus';
import LeftPane from '@/components/left-pane.vue';
import { getImport } from '@/import';
import { generateRandomString } from '@/utils';
import { useDraggable, useZoomCanvas } from '@/use';
import PageTool from '@/components/page-tool.vue';
import RightPane from '@/components/right-pane.vue';

defineOptions({
	components: {
		ClientPreview,
	},
});

const { id } = defineProps({
	id: String,
});
const router = useRouter();
const store = useStore();
const dragContainer = ref<HTMLElement>();
const dragCanvas = ref<HTMLElement>();
const dragTarget = ref<HTMLElement>();
const dragHandler = ref<HTMLElement>();
const { transformStyle } = useZoomCanvas(dragContainer);
const { posStyle } = useDraggable(dragTarget, {
	boundaryRef: dragCanvas,
	handlerRef: dragHandler,
});

// 返回
const clkBack = () => {
	router.back();
};

const clkSave = async () => {
	await fetchSaveJson({
		toastPending: true,
		data: {
			id,
			json: null,
		},
	});
	ElMessage.success('保存成功');
};

// const handlePostMessage = (info: any) => {};

// 查询json. 默认到page
const init = async () => {
	const data = await fetchGetJson({
		params: {
			id,
		},
	});
	const randomStr = generateRandomString(8);
	const _id = data?.id || randomStr;
	const _json = data || {
		id: _id,
		...getImport('page', 'schema'),
	};
	store.$patch({
		currentId: _id,
		json: _json,
		current: _json,
	});
};
init();
</script>

<style lang="scss" scoped>
.layout {
  background-color: rgb(247 247 252);
}

.left-pane {
  position: relative;
  background-color: #fff;
  border-right: 1px solid #d0d3d6;
  border: 1px solid rgba(6, 7, 9, .1);
  border-radius: 8px;
  flex-shrink: 0;
  width: 276px;
  height: calc(100vh - 64px);

  &__wrapper {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}

.center-pane {
  background-color: rgb(6 7 9 / 3%);
  border-radius: 8px;
  overflow: hidden;
}

.iframe-container {
  width: 375px;
  height: 667px;
  box-sizing: content-box;
}
</style>