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
            <div class="iframe-container border border-gray-200 rounded-md overflow-hidden">
              <ClientPreview />
            </div>
          </div>
        </div>
      </div>
      <div class="border-l border-gray-200 p-4 right-pane" :style="{ width: dragXWidth + 'px' }">
        <div class="right-pane-wrapper">
          <div class="resize-handle" @mousedown="startDragX"></div>
          <tab-radio :options="tabOptions" v-model="tabName"></tab-radio>
          <div class="collapse-wrapper" v-if="json">
            <el-collapse v-model="collapses" class="bt-none">
              <el-collapse-item :title="it.label" :name="i + 1" v-for="(it, i) in tabConfig">
                <div v-for="item in it.items" :key="item.name"
                  :class="['mb-4 last:mb-0 relative', item.full ? '' : 'flex items-start flex-wrap']">
                  <div class="w-25 flex items-center prop-left">
                    <div class="prop-label">{{ item.label }}</div>
                    <el-tooltip :content="item.tip" placement="top" v-if="item.tip">
                      <el-icon class="prop-icon ml-0.5">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                  <div class="flex flex-1 justify-end w-full">

                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ClientPreview from '@/components/preview.vue';
import TabRadio from '@/components/tab-radio.vue';
import { useStore } from '@/store';
import { fetchGetJson, fetchSaveJson } from '@/api';
import { ElMessage } from 'element-plus';
import LeftPane from '@/components/left-pane.vue';
import { getImport } from '@/import';
import { generateRandomString } from '@/utils';
import { useDragX, useDraggable, useZoomCanvas } from '@/use';
import PageTool from '@/components/page-tool.vue';

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
const { dragXWidth, startDragX } = useDragX();
const dragContainer = ref<HTMLElement>();
const dragCanvas = ref<HTMLElement>();
const dragTarget = ref<HTMLElement>();
const dragHandler = ref<HTMLElement>();
const { transformStyle } = useZoomCanvas(dragContainer);
const { posStyle } = useDraggable(dragTarget, {
	boundaryRef: dragCanvas,
	handlerRef: dragHandler,
});

const json = ref({});
const prop = ref([]);
const data = ref([]);

const tabOptions = ref([
	{ label: '属性', name: 'prop' },
	{ label: '数据', name: 'data' },
	{ label: '事件', name: 'event' },
]);
const tabName = ref('prop'); // 默认选中的选项卡 name
const tabConfig = computed(() => {
	return (tabName.value === 'prop' ? prop.value : data.value).map((it: any) => {
		return {
			...it,
			items: (it.items || [])
				.map((item: any) => {
					const { setter } = item;
					return {
						...item,
						visible: setter?.condition ? setter.condition(json.value) : true,
					};
				})
				.filter((item: any) => item.visible),
		};
	});
});
const defaultCollapse = [1, 2, 3, 4, 5, 6];
const collapses = ref([...defaultCollapse]);
watch(tabName, () => {
	collapses.value = [...defaultCollapse];
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

// 查询json
const init = async () => {
	const data = await fetchGetJson({
		params: {
			id,
		},
	});
	const _id = generateRandomString(8);
	store.$patch({
		currentId: data?.id || _id,
		json: data || {
			id: _id,
			...getImport('page', 'schema'),
		},
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
  background-color: #f5f5f5;
}

.resize-handle {
  position: absolute;
  top: 0;
  left: -9px;
  bottom: 0;
  cursor: col-resize;
  transition: all .2s ease;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  width: 8px;
  z-index: 800;

  &:hover,
  &:active {
    &::after {
      position: absolute;
      left: 4px;
      background-color: #4e40e5;
      content: "";
      height: 100%;
      transition: all .2s ease;
      transition-timing-function: cubic-bezier(.4, 0, .2, 1);
      width: 2px;
    }
  }
}

.right-pane {
  position: relative;
  background-color: #fff;
  border-left: 1px solid #d0d3d6;
  border: 1px solid rgba(6, 7, 9, .1);
  border-radius: 8px;
  flex-shrink: 0;
  min-width: 200px;
  height: calc(100vh - 64px);

  &-wrapper {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}

.collapse-wrapper {
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
    opacity: 0;
  }

  :deep(.el-collapse-item:nth-last-of-type(1)) {
    .el-collapse-item__wrap {
      border-bottom: none !important;
    }
  }
}

.bt-none {
  border-top: none !important;
}

.prop-left {
  display: flex;
  align-items: center;
  height: 32px;
  flex-shrink: 0;
}

.prop-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(6, 7, 9, 0.5);
  font-size: 12px;
  font-style: normal;
}

.prop-icon {
  font-size: 12px;
}
</style>