<template>
    <div class="border-l border-gray-200 p-4 right-pane" :style="{ width: dragXWidth + 'px' }">
        <div class="right-pane-wrapper">
            <div class="resize-handle" @mousedown="startDragX"></div>
            <tab-radio :options="tabOptions" v-model="tabName"></tab-radio>
            <div class="collapse-wrapper" v-if="current">
                <el-collapse v-model="collapses" class="bt-none">
                    <el-collapse-item :title="it.label" :name="i + 1" v-for="(it, i) in tabConfig">
                        <div v-for="item in it.items" :key="item.name"
                            :class="['mb-4 last:mb-0 relative', item.full ? '' : 'flex items-start flex-wrap']">
                            <div class="w-20 flex items-center prop-left">
                                <div class="prop-label">{{ item.label }}</div>
                                <el-tooltip :content="item.tip" placement="top" v-if="item.tip">
                                    <el-icon class="prop-icon ml-0.5">
                                        <Warning />
                                    </el-icon>
                                </el-tooltip>
                            </div>
                            <div class="flex flex-1 justify-end w-full">
                                <component 
                                    :is="item.setter.name || item.setter.component" 
                                    v-bind="{...(item.setter.props || {}), _current: {...filterCssVariables(current[tabName])}, _json: json}"
                                    v-model="current[tabName][item.name]"
                                    />
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useDragX } from '@/use';
import TabRadio from '@/components/tab-radio.vue';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import { filterCssVariables, toPascalCase } from '@/utils';

const store = useStore();
const { current, pane, json } = storeToRefs(store);
const { dragXWidth, startDragX } = useDragX();

const tabOptions = ref([
	{ label: '属性', name: 'props' },
	{ label: '数据', name: 'data' },
	{ label: '事件', name: 'events' },
]);

const tabName = ref<'props' | 'data' | 'events'>('props'); // 默认选中的选项卡 name
const tabConfig = computed(() => {
	if (!current.value || !pane.value) {
		return [];
	}
	const { type } = current.value;
	const config = pane.value[`${type}${toPascalCase(tabName.value)}Config`];
	return config.map((it: any) => {
		return {
			...it,
			items: (it.items || [])
				.map((item: any) => {
					const { setter } = item;
					return {
						...item,
						visible: setter?.condition ? setter.condition(current.value) : true,
					};
				})
				.filter((item: any) => item.visible),
		};
	});
});
const defaultCollapse = computed(() => Array.from({ length: tabConfig.value.length }, (_, i) => i + 1));
const collapses = ref();
watch([tabName, defaultCollapse], () => {
	collapses.value = [...defaultCollapse.value];
});
</script>

<style scoped lang="scss">
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
    position: relative;
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