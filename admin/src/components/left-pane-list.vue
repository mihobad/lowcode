<template>
    <div class="comp-list">
        <div v-for="item in CompList" :key="item.value" class="comp-item" draggable="true" @dragstart="handleDragStart($event, item)">
            <img :src="item.icon" class="comp-item-img" :id="`drag-icon${item.id}`">
            <div class="comp-item-label">{{ item.label }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CompList } from '@/constants';
import { useStore } from '@/store';
import { sleep } from '@anfu/utils';

const store = useStore();

const handleDragStart = async (e: DragEvent, item: any) => {
	const type = item.value;
	e.dataTransfer?.setData('text/plain', type);
	const img = document.getElementById(`drag-icon${item.id}`) as HTMLImageElement;
	e.dataTransfer?.setDragImage(img, 27, 27);

	await sleep(0);
	store.$patch({
		isDragging: true,
		draggedComponentType: type,
	});
};
</script>

<style lang="scss" scoped>
.comp-list {
    display: grid;
    grid-gap: 12px 8px;
    grid-template-columns: repeat(4, minmax(44px, 1fr));
    max-width: 100%;
    width: 100%;
}

.comp-item {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: flex-start;
    overflow: hidden;
    position: relative;

    &:hover {
        background: rgb(171 181 255 / 30%);
        border-radius: 6px;
        cursor: pointer;
    }

    &-img {
        aspect-ratio: 1 / 1;
        border-radius: 8px;
        object-fit: cover;
        width: 100%;
        user-select: none;
        transition: opacity 0.3s ease;
    }

    &-label {
        text-wrap: nowrap;
        color: rgb(15 21 40 / 82%);
        font-size: 10px;
        font-weight: 500;
        line-height: 14px;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
    }
}
</style>