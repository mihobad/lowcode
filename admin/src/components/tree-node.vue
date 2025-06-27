<template>
  <div class="tree-node">
    <div class="tree-node-wrapper">
      <div 
        :class="['node-content', { 
          'selected': isSelected, 
          'page-node': node.type === 'page', 
          'dashed': node.group && isPointerIng,  // 容器组件 + 拖拽悬浮时显示虚线边框
          'drag-over-before': dragPosition === 'before',
          'drag-over-after': dragPosition === 'after',
          'drag-over-inside': dragPosition === 'inside',
          'dragging': isDragSource
        }]"
        :style="{ paddingLeft: (level * 16) + 'px' }"
        :draggable="node.type !== 'page'"
        @click="handleClick"
        @dblclick="startEdit"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        @dragover="handleDragOver"
        @drop="handleDrop"
        @dragleave="handleDragLeave"
      >
        <span
          v-if="hasChildren" 
          :class="['expand-icon', { expanded }]"
          @click="toggleExpanded"
        >▶</span>
        <span v-else class="expand-placeholder"></span>
        
        <!-- 拖拽手柄 -->
        <span v-if="node.type !== 'page'" class="drag-handle">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="3" cy="3" r="1" fill="currentColor"/>
            <circle cx="9" cy="3" r="1" fill="currentColor"/>
            <circle cx="3" cy="6" r="1" fill="currentColor"/>
            <circle cx="9" cy="6" r="1" fill="currentColor"/>
            <circle cx="3" cy="9" r="1" fill="currentColor"/>
            <circle cx="9" cy="9" r="1" fill="currentColor"/>
          </svg>
        </span>
        
        <span v-if="!editing" class="component-name">{{ displayName }}</span>
        <input 
          v-else
          v-model="editingName"
          class="name-input"
          @blur="finishEdit"
          @keyup.enter="finishEdit"
          @keyup.esc="cancelEdit"
          @click.stop
          ref="nameInput"
        />
      </div>
      <div
        v-if="node.type !== 'page'"
        :class="['tree-node-line', isLineIng === 'after' && 'visible']"
        @dragover="handleLineDragOver"
        @drop="handleLineDrop"
        @dragleave="handleLineDragLeave"
        ></div>
    </div>
    
    <!-- 子节点 -->
    <div v-if="hasChildren && expanded" class="children">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
        :current-id="currentId"
        @select="(nodeId) => emit('select', nodeId)"
        @toggle="(nodeId, expanded) => emit('toggle', nodeId, expanded)"
        @rename="(nodeId, newName) => emit('rename', nodeId, newName)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { generateJson } from '@/utils';
import { useStore, type ComponentJson } from '@/store';

interface Props {
	node: ComponentJson;
	level?: number;
	currentId?: string;
}

interface Emits {
	(e: 'select', nodeId: string): void;
	(e: 'toggle', nodeId: string, expanded: boolean): void;
	(e: 'rename', nodeId: string, newName: string): void;
}

const props = withDefaults(defineProps<Props>(), {
	level: 0,
	currentId: '',
});

const store = useStore();
const emit = defineEmits<Emits>();

const expanded = ref(true);
const editing = ref(false);
const editingName = ref('');
const isPointerIng = ref(false);
const isLineIng = ref('');
const nameInput = ref<HTMLInputElement>();

// 拖拽排序相关状态
const isDragSource = ref(false);
const dragPosition = ref<'before' | 'after' | 'inside' | ''>('');
let draggedNodeId = '';

const hasChildren = computed(() => {
	return props.node.children && props.node.children.length > 0;
});

const isSelected = computed(() => {
	return props.node.id === props.currentId;
});

const displayName = computed(() => {
	return props.node.name;
});

const handleDragOver = (e: DragEvent) => {
	e.preventDefault();
	isPointerIng.value = true;

	const dragData = e.dataTransfer?.getData('text/plain');
	if (!dragData) return;
	// 区分是节点拖拽还是组件拖拽
	if (dragData.startsWith('node:')) {
		// 节点拖拽排序
		const draggedId = dragData.replace('node:', '');
		if (draggedId === props.node.id) return; // 不能拖拽到自己

		const target = e.currentTarget as HTMLElement;
		const position = getDragPosition(e, target);
		dragPosition.value = position;
	} else {
		dragPosition.value = '';
	}
};

const handleDragLeave = (e: DragEvent) => {
	e.preventDefault();
	isPointerIng.value = false;

	// 使用relatedTarget检查是否离开了当前元素
	const currentTarget = e.currentTarget as HTMLElement;
	const relatedTarget = e.relatedTarget as HTMLElement;

	// 如果relatedTarget不存在或不是当前元素的子元素，则清除状态
	if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
		dragPosition.value = '';
	}
};

const handleDrop = async (e: DragEvent) => {
	e.preventDefault();
	e.stopPropagation();
	isPointerIng.value = false;

	const dragData = e.dataTransfer?.getData('text/plain');
	if (!dragData) return;

	if (dragData.startsWith('node:')) {
		// 节点拖拽排序
		const draggedId = dragData.replace('node:', '');
		if (draggedId === props.node.id) return;

		const position = dragPosition.value;
		if (position) {
			store.moveComponent(draggedId, props.node.id, position);
		}
	} else {
		// 组件拖拽添加（保持原有逻辑）
		const name = dragData.trim();
		if (!name) return;
		const json = await generateJson(name);

		store.addComponentToChildren(json, props.node.id);
		await nextTick();
		emit('select', json.id);
	}

	// 清理状态
	dragPosition.value = '';
};

const handleLineDragOver = (e: DragEvent) => {
	e.preventDefault();
	isLineIng.value = 'after';
};

const handleLineDragLeave = async (e: DragEvent) => {
	e.preventDefault();
	isLineIng.value = '';
};

const handleLineDrop = async (e: DragEvent) => {
	e.stopPropagation();
	e.preventDefault();
	isLineIng.value = '';

	const dragData = e.dataTransfer?.getData('text/plain');
	if (!dragData) return;

	if (dragData.startsWith('node:')) {
		// 节点拖拽排序到after位置
		const draggedId = dragData.replace('node:', '');
		if (draggedId === props.node.id) return;

		store.moveComponent(draggedId, props.node.id, 'after');
	} else {
		// 组件拖拽添加（保持原有逻辑）
		const name = dragData.trim();
		if (!name) return;
		const json = await generateJson(name);

		store.addComponentToSibling(json, props.node.id, 'after');
		await nextTick();
		emit('select', json.id);
	}
};

const handleClick = () => {
	emit('select', props.node.id);
};

const toggleExpanded = (e: Event) => {
	e.stopPropagation();
	if (hasChildren.value) {
		expanded.value = !expanded.value;
		emit('toggle', props.node.id, expanded.value);
	}
};

const startEdit = async (e: Event) => {
	e.stopPropagation();
	if (props.node.type !== 'page') {
		editing.value = true;
		editingName.value = displayName.value;
		await nextTick();
		nameInput.value?.focus();
		nameInput.value?.select();
	}
};

const finishEdit = () => {
	if (editingName.value.trim() && editingName.value !== displayName.value) {
		emit('rename', props.node.id, editingName.value.trim());
	}
	editing.value = false;
};

const cancelEdit = () => {
	editing.value = false;
	editingName.value = '';
};

// 拖拽排序方法
const handleDragStart = (e: DragEvent) => {
	if (props.node.type === 'page') return;

	isDragSource.value = true;
	draggedNodeId = props.node.id;

	if (e.dataTransfer) {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', `node:${props.node.id}`);
	}
};

const handleDragEnd = () => {
	isPointerIng.value = false;
	isDragSource.value = false;
	dragPosition.value = '';
	draggedNodeId = '';
};

const getDragPosition = (e: DragEvent, element: HTMLElement): 'before' | 'after' | 'inside' => {
	const rect = element.getBoundingClientRect();
	const y = e.clientY - rect.top;
	const height = rect.height;

	// 如果是容器组件，支持inside位置
	if (props.node.group) {
		if (y < height * 0.25) return 'before';
		if (y > height * 0.75) return 'after';
		return 'inside';
	} else {
		// 非容器组件只支持before和after
		return y < height * 0.5 ? 'before' : 'after';
	}
};
</script>

<style lang="scss" scoped>
.tree-node {
  &-line {
    position: relative;
    height: 4px;

    &.visible {
      &::before {
        visibility: visible;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(61 121 242);
      visibility: hidden;
    }
  }

  .node-content {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    min-height: 28px;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
      background-color: #f3f4f6;
    }

    &.selected {
      background-color: #e0e7ff;
      color: #3730a3;
    }

    &.page-node {
      font-weight: 600;
    }

    &.dashed {
      border: 1px dashed #3730a3;
      background-color: #f0f9ff;
    }

    // 拖拽排序样式
    &.dragging {
      opacity: 0.5;
      transform: scale(0.95);
    }

    &.drag-over-before::before {
      content: '';
      position: absolute;
      top: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #3b82f6;
      border-radius: 1px;
      z-index: 1;
    }

    &.drag-over-after::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #3b82f6;
      border-radius: 1px;
      z-index: 1;
    }

    &.drag-over-inside {
      background-color: #dbeafe;
      border: 1px dashed #3b82f6;
    }

    // 当同时有dashed和drag-over-inside时，优先显示drag-over-inside
    &.dashed.drag-over-inside {
      border: 1px dashed #3b82f6;
      background-color: #dbeafe;
    }

    .drag-handle {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 4px;
      color: #9ca3af;
      cursor: grab;
      opacity: 0;
      transition: opacity 0.2s ease;

      &:hover {
        color: #6b7280;
      }

      &:active {
        cursor: grabbing;
      }
    }

    &:hover .drag-handle {
      opacity: 1;
    }

    .expand-icon {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 4px;
      font-size: 10px;
      color: #6b7280;
      cursor: pointer;
      transform: rotate(0deg);
      transition: transform 0.2s ease;

      &.expanded {
        transform: rotate(90deg);
      }

      &:hover {
        color: #374151;
      }
    }

    .expand-placeholder {
      width: 16px;
      margin-right: 4px;
    }

    .component-icon {
      width: 16px;
      height: 16px;
      margin-right: 6px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .component-name {
      flex: 1;
      font-size: 13px;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .name-input {
      flex: 1;
      font-size: 13px;
      border: 1px solid #3b82f6;
      border-radius: 2px;
      padding: 2px 4px;
      outline: none;
      background: white;
    }
  }

  .children {
    margin-left: 0;
  }
}
</style> 