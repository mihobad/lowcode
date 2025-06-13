<template>
    <div class="tabs">
      <div v-for="(item) in options" :key="item.label" :class="['tabs-item', { active: item.value === name }]"
        @click="changeTab(item)">
        <div v-if="item.icon" class="icon">
          <img :src="item.icon" alt="">
        </div>
        <div v-else>
          {{ item.label }}
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
import { type PropType } from 'vue';

const emit = defineEmits(['change']);

defineProps({
	options: {
		type: Array as PropType<Array<{ label: string; value: string; icon: string }>>,
		default: () => [],
	},
});
const name = defineModel<string>();

const changeTab = (item: { label: string; value: string }) => {
	name.value = item.value;
	emit('change', item.value);
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

      .icon {
        padding: 4px;

        img {
          width: 14px;
          height: 14px;
        }
      }
  
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