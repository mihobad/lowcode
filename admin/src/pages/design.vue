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
      <div class="flex-1 flex justify-center items-center center-pane">
        <div class="iframe-container border border-gray-200 rounded-md overflow-hidden">
          <ClientPreview />
        </div>
      </div>
      <div class="border-l border-gray-200 p-4 right-pane" :style="{ width: configWidth + 'px' }">
        <div class="right-pane__wrapper">
          <div class="resize-handle" @mousedown="startDrag"></div>
          <tab-radio :options="tabOptions" v-model="tabName"></tab-radio>
          <div class="collapse-wrapper" v-if="json">
            <el-collapse v-model="collapses" class="bt-none">
              <el-collapse-item :title="it.label" :name="i + 1" v-for="(it, i) in tabConfig">
                <div v-for="item in it.items" :key="item.name"
                  :class="['mb-4 last:mb-0 relative', item.full ? '' : 'flex items-start flex-wrap']">
                  <div class="w-25 flex items-center ui-left">
                    <div class="ui-label">{{ item.label }}</div>
                    <el-tooltip :content="item.tip" placement="top" v-if="item.tip">
                      <el-icon class="ui-icon ml-0.5">
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
import { computed, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ClientPreview from '@/components/preview.vue';
import TabRadio from '@/components/tab-radio.vue';
import { useStore } from '@/store';
import { fetchGetJson, fetchSaveJson } from '@/api';
import { ElMessage } from 'element-plus';
import LeftPane from '@/components/left-pane.vue';

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
const json = ref({});
const ui = ref([]);
const data = ref([]);

const tabOptions = ref([
	{ label: '样式配置', name: 'ui' },
	{ label: '数据配置', name: 'data' },
]);
const tabName = ref('ui'); // 默认选中的选项卡 name
const tabConfig = computed(() => {
	return (tabName.value === 'ui' ? ui.value : data.value).map((it: any) => {
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
			json: JSON.stringify({ children: [] }),
		},
	});
	ElMessage.success('保存成功');
};

const handlePostMessage = (info: any) => {};

// 查询json
const init = async () => {
	const data = await fetchGetJson({
		params: {
			id,
		},
	});
	store.$patch({
		json: data || {
			children: [],
		},
	});
};
init();

const configWidth = ref(300); // 默认宽度
const isDragging = ref(false);
const startX = ref(0);
const startWidth = ref(0);
const startDrag = (e: MouseEvent) => {
	isDragging.value = true;
	startX.value = e.clientX;
	startWidth.value = configWidth.value;

	// 添加拖拽时的样式
	document.body.style.cursor = 'col-resize';
	document.body.style.userSelect = 'none';

	document.addEventListener('mousemove', onDrag);
	document.addEventListener('mouseup', stopDrag);
};

const onDrag = (e: MouseEvent) => {
	if (!isDragging.value) return;

	const deltaX = startX.value - e.clientX;
	const newWidth = startWidth.value + deltaX;

	// 限制最小和最大宽度
	if (newWidth >= 270 && newWidth <= 400) {
		configWidth.value = newWidth;
	}
};

const stopDrag = () => {
	isDragging.value = false;

	// 恢复默认样式
	document.body.style.cursor = '';
	document.body.style.userSelect = '';

	document.removeEventListener('mousemove', onDrag);
	document.removeEventListener('mouseup', stopDrag);
};

onUnmounted(() => {
	document.removeEventListener('mousemove', onDrag);
	document.removeEventListener('mouseup', stopDrag);
});
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

  &__wrapper {
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

.ui-left {
  display: flex;
  align-items: center;
  height: 32px;
  flex-shrink: 0;
}

.ui-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(6, 7, 9, 0.5);
  font-size: 12px;
  font-style: normal;
}

.ui-icon {
  font-size: 12px;
}
</style>