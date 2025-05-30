import { reactive, onMounted, onUnmounted, type Ref, computed } from 'vue';

export function useZoomCanvas(canvasRef: Ref<HTMLElement | undefined>) {
	const state = reactive({
		scale: 1,
		offsetX: 0,
		offsetY: 0,
		initialDistance: 0,
		initialScale: 1,
		initialX: 0,
		initialY: 0,
	});

	const transformStyle = computed(() => {
		return {
			transform: `translate(${state.offsetX}px, ${state.offsetY}px) scale(${state.scale})`,
		};
	});

	const handleWheel = (e: WheelEvent) => {
		if (e.ctrlKey) {
			e.preventDefault();
			const zoomSpeed = 0.004;

			// 获取画布位置
			const rect = canvasRef.value?.getBoundingClientRect() || { left: 0, top: 0 };

			// 计算鼠标在画布内的相对位置
			const mouseX = e.clientX - rect.left;
			const mouseY = e.clientY - rect.top;

			// 保存旧缩放值
			const oldScale = state.scale;

			// 计算新缩放值
			const newScale = Math.min(Math.max(0.1, state.scale * (1 - e.deltaY * zoomSpeed)), 10);

			// 计算偏移补偿：保持鼠标点位置不变
			state.offsetX -= (mouseX - state.offsetX) * (newScale / oldScale - 1);
			state.offsetY -= (mouseY - state.offsetY) * (newScale / oldScale - 1);

			state.scale = newScale;
		} else {
			e.preventDefault();
			state.offsetX -= e.deltaX;
			state.offsetY -= e.deltaY;
		}
	};

	onMounted(() => {
		if (canvasRef.value) {
			canvasRef.value.addEventListener('wheel', handleWheel, { passive: false });
		}
	});

	onUnmounted(() => {
		if (canvasRef.value) {
			canvasRef.value.removeEventListener('wheel', handleWheel);
		}
	});

	return {
		transformStyle,
		scale: computed(() => state.scale),
		offset: computed(() => ({ x: state.offsetX, y: state.offsetY })),
	};
}
