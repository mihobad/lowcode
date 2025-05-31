<template>
    <component :is="importMap[json.type]?.component" />
</template>

<script setup lang="ts">
import { importMap } from '@/import';

defineOptions({
	name: 'RenderComponent',
});

defineProps({
	json: {
		type: Object,
		required: true,
	},
});
</script>