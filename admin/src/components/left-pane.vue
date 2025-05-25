<template>
    <div>
        <tab-radio :options="tabOptions" v-model="tabName"></tab-radio>
        <div class="pt-2">
            <component :is="tabName" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TabRadio from './tab-radio.vue';
import CompList from './comp-list.vue';
import PageTree from './page-tree.vue';

defineOptions({
	components: {
		TabRadio,
		CompList,
		PageTree,
	},
});

const tabOptions = [
	{ label: '组件', name: 'comp-list' },
	{ label: '结构', name: 'page-tree' },
];
const tabName = ref('comp-list');
</script>