<template>
  <component
    :is="json.type"
    v-bind="json.props"
  >
    <template v-for="child in json.children" :key="child.id">
      <render-component :json="child" />
    </template>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'RenderComponent',
	props: {
		json: {
			type: Object,
			required: true,
		},
	},
	setup() {},
});
</script>

<style scoped>
.component-wrapper {
  position: relative;
  min-height: 50px;
}
</style>