import { ref, onUnmounted } from 'vue';

const useDragX = () => {
	const dragXWidth = ref(320);
	const isDragging = ref(false);
	const startX = ref(0);
	const startWidth = ref(0);

	const startDragX = (e: MouseEvent) => {
		isDragging.value = true;
		startX.value = e.clientX;
		startWidth.value = dragXWidth.value;

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
		if (newWidth >= 320 && newWidth <= 480) {
			dragXWidth.value = newWidth;
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

	return {
		dragXWidth,
		startDragX,
	};
};

export { useDragX };
