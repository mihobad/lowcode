<template>
  <component
    :is="name"
    :json="json"
    :data-component-id="json.id"
    :data-component-group="json.group ? '1' : '0'"
    v-if="name"
  >
    <template v-for="child in json.children || []" :key="child.id">
      <render-component :json="child" />
    </template>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
	name: 'RenderComponent',
});

const { json } = defineProps({
	json: {
		type: Object,
		required: true,
	},
});

const name = computed(() => {
	const { type, version } = json;
	if (!type || !version) {
		return '';
	}
	return `${type}_${version.replace(/\./g, '_')}`;
});
</script>

<style scoped>
.component-wrapper {
  position: relative;
  min-height: 50px;
}
</style>