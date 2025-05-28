import { ref, onUnmounted } from 'vue';

const useDrag = () => {
	const dragWidth = ref(300);
	const isDragging = ref(false);
	const startX = ref(0);
	const startWidth = ref(0);

	const startDrag = (e: MouseEvent) => {
		isDragging.value = true;
		startX.value = e.clientX;
		startWidth.value = dragWidth.value;

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
		if (newWidth >= 270 && newWidth <= 480) {
			dragWidth.value = newWidth;
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
		dragWidth,
		startDrag,
	};
};

export { useDrag };
