<template>
  <div 
    class="component-highlight"
    :style="{
      top: position.y + 'px',
      left: position.x + 'px',
      width: position.width + 'px',
      height: position.height + 'px'
    }">
    <div class="highlight-border" />
  </div>
</template>

<script setup lang="ts">
interface Props {
	position: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.component-highlight {
  position: absolute;
  pointer-events: none;
  z-index: 999;

  .highlight-border {
    width: 100%;
    height: 100%;
    border: 1px dashed #5546ff;
  }
}

</style>