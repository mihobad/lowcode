<template>
    <div class="component-highlight" :style="{
        top: position.y + 'px',
        left: position.x + 'px',
        width: position.width + 'px',
        height: position.height + 'px'
    }">
        <div class="highlight-border" />
        <div v-for="dir in ['top-left', 'top-right', 'bottom-left', 'bottom-right']" :key="dir" class="resize-corner"
            :class="[dir]" @mousedown="handleResizeStart(dir as ResizeDirection, $event)"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Position = {
	x: number;
	y: number;
	width: number;
	height: number;
};

interface Props {
	position: Position;
}
interface Props {
	position: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
}

const props = defineProps<Props>();

enum ResizeDirection {
	TOP_LEFT = 'top-left',
	TOP_RIGHT = 'top-right',
	BOTTOM_LEFT = 'bottom-left',
	BOTTOM_RIGHT = 'bottom-right',
}

const resizeDirection = ref<ResizeDirection>(ResizeDirection.BOTTOM_RIGHT);
const isResizing = ref(false);
const startX = ref(0);
const startY = ref(0);
const resizePosition = ref<Props['position']>({ x: 0, y: 0, width: 0, height: 0 });

const handleResizeStart = (dir: ResizeDirection, event: MouseEvent) => {
	resizeDirection.value = dir;
	isResizing.value = true;
	startX.value = event.clientX;
	startY.value = event.clientY;
	resizePosition.value = { ...props.position } as Position;
};

const handleMouseMove = (event: MouseEvent) => {
	if (!isResizing.value) return;

	const MIN_SIZE = 20;
	const deltaX = event.clientX - startX.value;
	const deltaY = event.clientY - startY.value;

	const newWidth = resizePosition.value.width + (resizeDirection.value.endsWith('RIGHT') ? deltaX : -deltaX);
	const newHeight = resizePosition.value.height + (resizeDirection.value.startsWith('BOTTOM') ? deltaY : -deltaY);

	// 尺寸边界检测
	if (newWidth < MIN_SIZE || newHeight < MIN_SIZE) return;

	// 智能坐标计算
	switch (resizeDirection.value) {
		case ResizeDirection.TOP_LEFT:
			resizePosition.value.x += deltaX;
			resizePosition.value.y += deltaY;
			break;
		case ResizeDirection.TOP_RIGHT:
			resizePosition.value.y += deltaY;
			break;
		case ResizeDirection.BOTTOM_LEFT:
			resizePosition.value.x += deltaX;
			break;
	}

	// 使用节流更新尺寸
	requestAnimationFrame(() => {
		resizePosition.value.width = Math.max(newWidth, MIN_SIZE);
		resizePosition.value.height = Math.max(newHeight, MIN_SIZE);
	});
};

const updatePosition = () => {
	// Implementation would go here
};
</script>

<style scoped lang="scss">
.component-highlight {
    position: absolute;
    pointer-events: none;
    z-index: 999;

    .highlight-border {
        width: 100%;
        height: 100%;
        border: 1px solid #5546ff;
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
    cursor: nwse-resize;
    transition: transform 0.2s ease;
    pointer-events: auto;

    &:hover {
        transform: scale(1.2);
        background: #66b1ff;
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