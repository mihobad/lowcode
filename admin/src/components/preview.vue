<template>
	<div class="lowcode-preview">
		<div class="lowcode-preview-body overflow-y-auto" 
			@dragover="handleDragOver"
			@drop="handleDrop"
			@mousemove="handleMouseMove" 
			@mouseleave="handleMouseLeave" 
			@mousedown="handleMouseDown">
			<RenderComponent :json="json" />
			<PointerHover :position="hoverPosition" v-if="isHover" />
			<PointerResize :position="resizePosition" v-if="currentId" @update:position="handlePositionUpdate" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import RenderComponent from './render-component.vue';
import PointerHover from './pointer-hover.vue';
import PointerResize from './pointer-resize.vue';
import { findParentAttr, generateRandomString, loadAnfuScript } from '@/utils';

interface Position {
	x: number;
	y: number;
	width: number;
	height: number;
	id?: string;
}

defineOptions({
	name: 'PreviewArea',
});

const store = useStore();
const { json, currentId, current } = storeToRefs(store);
const isHover = ref(false);
const hoverPosition = ref<Position>({
	x: 0,
	y: 0,
	width: 0,
	height: 0,
});
const resizePosition = ref<Position>({
	x: 0,
	y: 0,
	width: 0,
	height: 0,
});

// 监听currentId变化，同步更新resizePosition
watch(
	currentId,
	async (newId) => {
		if (newId && current.value) {
			await nextTick();
			// 尝试从DOM获取当前组件位置
			const dom = document.querySelector(`[data-component-id="${newId}"]`) as HTMLElement;
			if (dom) {
				const rect = dom.getBoundingClientRect();
				const rootDom = document.querySelector('.lowcode-preview-body') as HTMLElement;
				if (rootDom) {
					const { top, left } = rootDom.getBoundingClientRect();
					const scale = +(findParentAttr(rootDom, 'data-scale') || 1);

					resizePosition.value = {
						x: Math.max(0, rect.left - left),
						y: Math.max(0, rect.top - top),
						width: Math.max(10, rect.width / scale),
						height: Math.max(10, rect.height / scale),
						id: newId,
					};
				}
			}
		}
	},
	{ immediate: true },
);

const getComponentPosition = (event: MouseEvent, componentId?: string) => {
	try {
		const target = event.srcElement! as HTMLElement;
		const id = componentId || findParentAttr(target, 'data-component-id');
		if (!id) return null;

		const dom = document.querySelector(`[data-component-id="${id}"]`) as HTMLElement;
		if (!dom) {
			console.warn('组件DOM元素未找到:', id);
			return null;
		}

		const rect = dom.getBoundingClientRect();
		const rootDom = document.querySelector('.lowcode-preview-body') as HTMLElement;
		if (!rootDom) {
			console.warn('预览容器未找到');
			return null;
		}

		const { top, left } = rootDom.getBoundingClientRect();
		const scale = +(findParentAttr(rootDom, 'data-scale') || 1);

		// 确保位置值是有效的
		const position = {
			x: Math.max(0, rect.left - left),
			y: Math.max(0, rect.top - top),
			width: Math.max(10, rect.width / scale), // 最小宽度10px
			height: Math.max(10, rect.height / scale), // 最小高度10px
			id,
		};

		return position;
	} catch (error) {
		console.error('获取组件位置失败:', error);
		return null;
	}
};

const handleMouseMove = (event: MouseEvent) => {
	const position = getComponentPosition(event);
	if (position) {
		hoverPosition.value = position;
		isHover.value = true;
	}
};

const handleMouseLeave = () => {
	isHover.value = false;
	hoverPosition.value = { x: 0, y: 0, width: 0, height: 0 };
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
	event.dataTransfer!.dropEffect = 'copy';
};

const handleDrop = async (event: DragEvent) => {
	event.preventDefault();
	const name = event.dataTransfer?.getData('text/plain').trim();

	if (!name) return;

	try {
		const res = await loadAnfuScript(`${name}`);

		const randomStr = generateRandomString(8);
		const _id = randomStr;
		const _json = {
			id: _id,
			...res[`${name}SchemaJson`],
		};

		// 添加组件到store
		store.addComponent(_json);

		// 等待DOM更新完成
		await nextTick();

		// 获取新添加组件的位置信息并设置调整手柄
		const position = getComponentPosition(event, _id);
		if (position) {
			resizePosition.value = position;
		}
	} catch (error) {
		console.error('组件加载失败:', error);
	}
};

const handlePositionUpdate = (newPosition: Position) => {
	// 更新本地位置状态
	resizePosition.value = newPosition;
	console.log('newPosition', newPosition);
	// 同步位置信息到store中的当前组件
	if (store.current) {
		// 更新组件的样式属性 TODO: 这里需要优化
		const updatedProps = {
			...store.current.props,
			position: {
				...store.current.props.position,
				top: newPosition.y,
				left: newPosition.x,
			},
			width: {
				type: '1',
				value: newPosition.width,
			},
			height: {
				type: '1',
				value: newPosition.height,
			},
		};

		// 使用store的更新方法
		store.updateCurrentComponent({
			props: updatedProps,
		});
	}
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
