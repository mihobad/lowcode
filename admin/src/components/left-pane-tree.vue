<template>
  <div class="tree-container">
    <div class="tree-content">
      <TreeNode
        v-if="json.id"
        :node="json" 
        :level="0" 
        :current-id="currentId"
        @select="handleSelectNode"
        @toggle="handleToggleNode"
        @rename="handleRenameNode"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import type { ComponentJson } from '@/store';
import TreeNode from './tree-node.vue';

const store = useStore();
const { json, currentId } = storeToRefs(store);

const handleSelectNode = (nodeId: string) => {
	store.setCurrentComponent(nodeId);
};

const handleToggleNode = (nodeId: string, expanded: boolean) => {
	// 可以在这里保存展开状态到localStorage等
	console.log('Toggle node:', nodeId, expanded);
};

const handleRenameNode = (nodeId: string, newName: string) => {
	const component = store.json;
	const target = findComponentById(component, nodeId);
	if (target) {
		target.name = newName;
		// 触发更新
		store.updateCurrentComponent({ name: newName });
	}
};

// 辅助函数：查找组件
const findComponentById = (component: ComponentJson, id: string): ComponentJson | null => {
	if (component.id === id) {
		return component;
	}
	if (component.children) {
		for (const child of component.children) {
			const result = findComponentById(child, id);
			if (result) return result;
		}
	}
	return null;
};
</script>

<style lang="scss" scoped>
.tree-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tree-header {
  padding: 8px 0;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 8px;
}

.tree-content {
  flex: 1;
  overflow-y: auto;
}

.tree-node {
  .node-content {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    margin: 1px 0;
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

/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
  color: #6b7280;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .empty-text {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #374151;
  }

  .empty-description {
    font-size: 14px;
    color: #9ca3af;
  }
}

/* 滚动条样式 */
.tree-content::-webkit-scrollbar {
  width: 4px;
}

.tree-content::-webkit-scrollbar-track {
  background: transparent;
}

.tree-content::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.tree-content::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>