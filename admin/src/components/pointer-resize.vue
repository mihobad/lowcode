<template>
    <div class="component-highlight" :style="{
        top: position.y + 'px',
        left: position.x + 'px',
        width: position.width + 'px',
        height: position.height + 'px'
    }">
        <div :class="['highlight-border', { 'none': isPageComponent }]" @mousedown="handleDragStart">
            <div v-for="edge in ['top', 'bottom', 'left', 'right']" :key="edge" class="resize-edge" :class="[edge]"
                @mousedown="handleResizeStart(edge as ResizeDirection, $event)">
            </div>
        </div>

        <div v-for="dir in ['top-left', 'top-right', 'bottom-left', 'bottom-right']" :key="dir"
            :class="['resize-corner', dir]" @mousedown="handleResizeStart(dir as ResizeDirection, $event)">
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useStore();
const { current } = storeToRefs(store);

const isPageComponent = computed(() => {
	return current.value?.type === 'page';
});

interface Position {
	x: number;
	y: number;
	width: number;
	height: number;
}

interface Props {
	position: Position;
}

// 定义emit事件
interface Emits {
	(e: 'update:position', position: Position): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

enum ResizeDirection {
	TOP = 'top',
	BOTTOM = 'bottom',
	LEFT = 'left',
	RIGHT = 'right',
	TOP_LEFT = 'top-left',
	TOP_RIGHT = 'top-right',
	BOTTOM_LEFT = 'bottom-left',
	BOTTOM_RIGHT = 'bottom-right',
	MOVE = 'move',
}

const resizeDirection = ref<ResizeDirection>(ResizeDirection.BOTTOM_RIGHT);
const isResizing = ref(false);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const startPosition = ref<Position>({ x: 0, y: 0, width: 0, height: 0 });

// 处理拖拽移动开始
const handleDragStart = (event: MouseEvent) => {
	if (isPageComponent.value) return;
	event.preventDefault();
	event.stopPropagation();

	resizeDirection.value = ResizeDirection.MOVE;
	isDragging.value = true;
	startX.value = event.clientX;
	startY.value = event.clientY;
	startPosition.value = { ...props.position };

	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('mouseup', handleMouseUp);
	document.body.style.cursor = 'move';
};

// 处理调整大小开始
const handleResizeStart = (dir: ResizeDirection, event: MouseEvent) => {
	if (isPageComponent.value) return;
	event.preventDefault();
	event.stopPropagation();

	resizeDirection.value = dir;
	isResizing.value = true;
	startX.value = event.clientX;
	startY.value = event.clientY;
	startPosition.value = { ...props.position };

	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('mouseup', handleMouseUp);
};

const handleMouseMove = (event: MouseEvent) => {
	if (!isResizing.value && !isDragging.value) return;

	event.preventDefault();

	const deltaX = event.clientX - startX.value;
	const deltaY = event.clientY - startY.value;

	// 处理拖拽移动
	if (isDragging.value && resizeDirection.value === ResizeDirection.MOVE) {
		const newPosition: Position = {
			x: Math.max(0, startPosition.value.x + deltaX),
			y: Math.max(0, startPosition.value.y + deltaY),
			width: startPosition.value.width,
			height: startPosition.value.height,
		};
		emit('update:position', newPosition);
		return;
	}

	// 处理调整大小
	if (!isResizing.value) return;

	const MIN_SIZE = 10;
	let newX = startPosition.value.x;
	let newY = startPosition.value.y;
	let newWidth = startPosition.value.width;
	let newHeight = startPosition.value.height;

	// 根据调整方向计算新的位置和尺寸
	switch (resizeDirection.value) {
		case ResizeDirection.TOP:
			newY = startPosition.value.y + deltaY;
			newHeight = startPosition.value.height - deltaY;
			break;
		case ResizeDirection.BOTTOM:
			newHeight = startPosition.value.height + deltaY;
			break;
		case ResizeDirection.LEFT:
			newX = startPosition.value.x + deltaX;
			newWidth = startPosition.value.width - deltaX;
			break;
		case ResizeDirection.RIGHT:
			newWidth = startPosition.value.width + deltaX;
			break;
		case ResizeDirection.TOP_LEFT:
			newX = startPosition.value.x + deltaX;
			newY = startPosition.value.y + deltaY;
			newWidth = startPosition.value.width - deltaX;
			newHeight = startPosition.value.height - deltaY;
			break;
		case ResizeDirection.TOP_RIGHT:
			newY = startPosition.value.y + deltaY;
			newWidth = startPosition.value.width + deltaX;
			newHeight = startPosition.value.height - deltaY;
			break;
		case ResizeDirection.BOTTOM_LEFT:
			newX = startPosition.value.x + deltaX;
			newWidth = startPosition.value.width - deltaX;
			newHeight = startPosition.value.height + deltaY;
			break;
		case ResizeDirection.BOTTOM_RIGHT:
			newWidth = startPosition.value.width + deltaX;
			newHeight = startPosition.value.height + deltaY;
			break;
	}

	// 边界检测
	if (newWidth < MIN_SIZE || newHeight < MIN_SIZE) return;

	// 对于需要调整位置的情况，确保不会超出边界
	if (newX < 0) {
		newWidth += newX;
		newX = 0;
	}
	if (newY < 0) {
		newHeight += newY;
		newY = 0;
	}

	// 应用新的位置和尺寸
	const newPosition: Position = {
		x: newX,
		y: newY,
		width: Math.max(newWidth, MIN_SIZE),
		height: Math.max(newHeight, MIN_SIZE),
	};

	// 通知父组件位置变化
	emit('update:position', newPosition);
};

const handleMouseUp = (event: MouseEvent) => {
	if (!isResizing.value && !isDragging.value) return;

	event.preventDefault();
	event.stopPropagation();

	isResizing.value = false;
	isDragging.value = false;
	document.removeEventListener('mousemove', handleMouseMove);
	document.removeEventListener('mouseup', handleMouseUp);
	document.body.style.cursor = '';
};
</script>

<style scoped lang="scss">
.component-highlight {
    position: absolute;
    pointer-events: none;
    z-index: 999;

    .highlight-border {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px solid rgb(81 71 255);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
        cursor: move; // 默认显示移动光标
        pointer-events: all; // 允许交互
        transition: all 0.2s ease;

        &.none {
            pointer-events: none;
        }
    }
}

.resize-edge {
    position: absolute;
    $thickness: 8px; // 增加厚度，更容易点击
    background: transparent; // 透明背景
    opacity: 1;
    pointer-events: all;
    z-index: 1; // 确保在 highlight-border 之上

    &.top,
    &.bottom {
        left: 0;
        right: 0;
        height: $thickness;
        cursor: ns-resize;
    }

    &.left,
    &.right {
        top: 0;
        bottom: 0;
        width: $thickness;
        cursor: ew-resize;
    }

    &.top {
        top: -$thickness/2;
    }

    &.bottom {
        bottom: -$thickness/2;
    }

    &.left {
        left: -$thickness/2;
    }

    &.right {
        right: -$thickness/2;
    }
}

.resize-corner {
    $size: 8px;
    width: $size;
    height: $size;
    background: #fff;
    border: 1px solid rgb(81 71 255);
    border-radius: 50%;
    position: absolute;
    pointer-events: auto;
    transition: all 0.2s ease;
    z-index: 1; // 确保在 highlight-border 之上

    &:hover {
        transform: scale(1.1);
        background: rgb(81 71 255);
        border-color: rgb(71 61 245);
    }

    &.top-left {
        top: -$size/2;
        left: -$size/2;
        cursor: nwse-resize;
    }

    &.top-right {
        top: -$size/2;
        right: -$size/2;
        cursor: nesw-resize;
    }

    &.bottom-left {
        bottom: -$size/2;
        left: -$size/2;
        cursor: nesw-resize;
    }

    &.bottom-right {
        bottom: -$size/2;
        right: -$size/2;
        cursor: nwse-resize;
    }
}
</style>