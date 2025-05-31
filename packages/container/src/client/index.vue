<template>
  <div>
    <h1>ContainerClient</h1>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

defineOptions({
	name: 'ContainerClient',
	components: {},
});
</script>

<style scoped lang="scss"></style>