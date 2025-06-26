<template>
  <div class="tree-node">
    <div class="tree-node-wrapper">
      <div 
        :class="['node-content', { 'selected': isSelected, 'page-node': node.type === 'page', 'dashed': node.group && isPointerIng }]"
        :style="{ paddingLeft: (level * 16) + 'px' }"
        @click="handleClick"
        @dblclick="startEdit"
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
import { generateRandomString, loadAnfuScript } from '@/utils';
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
};

const handleDrop = async (e: DragEvent) => {
	e.preventDefault();
	e.stopPropagation();
	isPointerIng.value = false;
	const name = e.dataTransfer?.getData('text/plain').trim();
	if (!name) return;
	const res = await loadAnfuScript(`${name}`);

	const randomStr = generateRandomString(8);
	const _id = randomStr;
	const _json = {
		id: _id,
		...res[`${name}SchemaJson`],
	};

	store.addComponent(_json);
	await nextTick();
	emit('select', _id);
};

const handleDragLeave = () => {
	isPointerIng.value = false;
};

const handleLineDragOver = () => {
	isLineIng.value = 'after';
};

const handleLineDragLeave = () => {
	isLineIng.value = '';
};

const handleLineDrop = () => {
	isLineIng.value = '';
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
</script>

<style lang="scss" scoped>
.tree-node {
  &-line {
    position: relative;
    height: 3px;

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