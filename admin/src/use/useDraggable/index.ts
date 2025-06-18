import { ref, onMounted, onBeforeUnmount, nextTick, computed, type Ref } from 'vue';

interface UseDraggableOptions {
	initialX?: number;
	initialY?: number;
	boundaryRef?: any;
	handlerRef?: any;
	scale?: Ref<number>;
}

export function useDraggable(targetRef: any, options: UseDraggableOptions = {}) {
	const pos = ref({ x: options.initialX ?? 0, y: options.initialY ?? 0 });
	const posStyle = computed(() => {
		return {
			top: `${pos.value.y / (options.scale?.value || 1)}px`,
			left: `${pos.value.x / (options.scale?.value || 1)}px`,
		};
	});
	let startX = 0;
	let startY = 0;
	let dragging = false;
	let resizeObserver: ResizeObserver | null = null;

	function getBoundaryRect() {
		if (options.boundaryRef?.value) {
			return options.boundaryRef.value.getBoundingClientRect();
		}
		return {
			left: 0,
			top: 0,
			right: window.innerWidth,
			bottom: window.innerHeight,
			width: window.innerWidth,
			height: window.innerHeight,
		};
	}

	function getTargetRect() {
		return targetRef.value?.getBoundingClientRect() || { width: 0, height: 0 };
	}

	// 居中初始化
	function centerPosition() {
		const boundary = getBoundaryRect();
		const target = getTargetRect();
		pos.value.x = (boundary.width - (target.width || 0)) / 2;
		pos.value.y = (boundary.height - (target.height || 0)) / 2;
	}

	function onDragStart(e: MouseEvent | TouchEvent) {
		e.stopPropagation();
		dragging = true;
		const mouse = e as MouseEvent;
		startX = mouse.clientX - pos.value.x;
		startY = mouse.clientY - pos.value.y;
		window.addEventListener('mousemove', onDragging, { passive: false });
		window.addEventListener('mouseup', onDragEnd, { passive: false });
	}

	function onDragging(e: MouseEvent | TouchEvent) {
		if (!dragging) return;
		e.preventDefault();
		let x: number, y: number;
		const mouse = e as MouseEvent;
		x = mouse.clientX;
		y = mouse.clientY;
		let nextX = x - startX;
		let nextY = y - startY;

		// 边界判断（已注释）
		// const boundary = getBoundaryRect();
		// const target = getTargetRect();
		// const minX = 0;
		// const maxX = boundary.width - (target.width || 0);
		// const minY = 0;
		// const maxY = boundary.height - (target.height || 0);
		//
		// nextX = Math.min(Math.max(nextX, minX), maxX);
		// nextY = Math.min(Math.max(nextY, minY), maxY);

		pos.value.x = nextX;
		pos.value.y = nextY;
	}

	function onDragEnd() {
		dragging = false;
		window.removeEventListener('mousemove', onDragging);
		window.removeEventListener('mouseup', onDragEnd);
	}

	onMounted(async () => {
		await nextTick();
		centerPosition();
		const { boundaryRef, handlerRef } = options;
		const dragEl = handlerRef?.value || targetRef.value;
		if (dragEl) {
			dragEl.addEventListener('mousedown', onDragStart);
		}
		if (boundaryRef.value) {
			// resizeObserver = new ResizeObserver(centerPosition);
			// resizeObserver.observe(boundaryRef.value);
		}
	});

	onBeforeUnmount(() => {
		onDragEnd();
		const dragEl = options.handlerRef?.value || targetRef.value;
		if (dragEl) {
			dragEl.removeEventListener('mousedown', onDragStart);
		}
		if (resizeObserver) {
			// resizeObserver.disconnect();
			// resizeObserver = null;
		}
	});

	return { pos, posStyle, centerPosition };
}
