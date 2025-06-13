<template>
    <div class="line-setter w-full">
        <div class="flex justify-end">
            <div v-if="modelValue.enable" class="line-setter-input">
                <el-input-number v-model="modelValue.value" :min="1" :controls="false" />
            </div>
            <div :class="['line-setter-icon', modelValue.enable && 'active']" @click="visibleChange">
                <Add v-if="!modelValue.enable" />
                <Minus v-else />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Add from './images/add.vue';
import Minus from './images/minus.vue';

const modelValue = defineModel<{ enable: boolean; value: number }>({
	default: {
		enable: false,
		value: 1,
	},
});

const emit = defineEmits(['post-message']);

const visibleChange = () => {
	modelValue.value = {
		enable: !modelValue.value?.enable,
		value: modelValue.value?.value ?? 1,
	};
};
</script>

<style lang="scss" scoped>
.line-setter {
    &-input {
        flex: 1;

        :deep(.el-input-number) {
            width: 100% !important;
            display: block !important;
        }
    }

    &-icon {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        margin-left: 4px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &.active,
        &:hover {
            background-color: rgb(87 104 161 / 8%);
            color: rgb(81 71 255);
        }
    }
}
</style>