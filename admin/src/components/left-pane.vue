<template>
    <div>
        <tab-radio :options="tabOptions" v-model="tabName"></tab-radio>
        <div class="pt-2">
            <component :is="tabName" />
        </div>
    </div>
</template>

<script setup lang="ts">
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
const store = useStore();
const { tabName } = storeToRefs(store);
</script>