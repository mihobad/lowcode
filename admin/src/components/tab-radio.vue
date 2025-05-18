<template>
  <div class="tabs">
    <div v-for="(item) in options" :key="item.label" :class="['tabs-item', { active: item.name === name }]"
      @click="changeTab(item)">
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue';

const emit = defineEmits(['change']);

defineProps({
	options: {
		type: Array as PropType<Array<{ label: string; name: string }>>,
		default: () => [],
	},
});
const name = defineModel<string>();

const changeTab = (item: { label: string; name: string }) => {
	name.value = item.name;
	emit('change', item.name);
};
</script>

<style scoped lang="scss">
.tabs {
  width: 100%;
  align-items: center;
  background: rgba(6, 7, 9, .04);
  border-radius: 10px;
  display: flex;
  gap: 4px;
  height: 32px;
  padding: 4px;

  &-item {
    border-radius: 6px;
    color: rgba(6, 7, 9, .8);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    height: 24px;
    justify-content: center;
    padding: 4px;
    flex: 1;
    cursor: pointer;

    &:hover {
      background: rgba(6, 7, 9,.04);
    }

    &.active {
      background: #fff;
      border-radius: 6px;
      color: rgba(6, 7, 9, .8);
    }
  }
}
</style>