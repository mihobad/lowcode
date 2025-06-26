<template>
    <div>
        <tab-radio :options="tabOptions" v-model="tabName"></tab-radio>
        <div class="pt-2">
            <component :is="tabName" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import TabRadio from './tab-radio.vue';
import LeftPaneList from './left-pane-list.vue';
import LeftPaneTree from './left-pane-tree.vue';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';

defineOptions({
	components: {
		TabRadio,
		LeftPaneList,
		LeftPaneTree,
	},
});

const tabOptions = [
	{ label: '组件', name: 'left-pane-list' },
	{ label: '结构', name: 'left-pane-tree' },
];
const tabName = ref('left-pane-list');
const store = useStore();
const { isDragging } = storeToRefs(store);

watch(
	isDragging,
	(nv) => {
		if (nv) {
			tabName.value = 'left-pane-tree';
		}
	},
	{ flush: 'post' },
);
</script>