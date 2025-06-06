<template>
    <div class="border-setter">
        <div class="flex justify-end items-center">
            <div :class="['border-setter-icon', !border.none && 'active']" @click="visibleChange">
                <Icon1 v-if="border.none" />
                <Icon2 v-else />
            </div>
        </div>
        <div class="flex justify-end mt-2" v-if="!border.none">
            <div class="border-setter-wrap flex">
                <el-input-number v-model="border.borderWidth" :controls="false" />
                <el-color-picker v-model="border.borderColor" show-alpha />
                <el-select v-model="border.borderStyle">
                    <el-option label="实线" value="solid" />
                    <el-option label="虚线" value="dashed" />
                    <el-option label="点线" value="dotted" />
                </el-select>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Icon1 from './icon1.vue';
import Icon2 from './icon2.vue';

const border = defineModel({
	type: Object,
});

const visibleChange = () => {
	border.value = {
		...border.value,
		none: !border.value.none,
	};
};
</script>

<style lang="scss" scoped>
.border-setter {
    width: 100%;
    margin-top: -32px;

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

    &-wrap {
        width: calc(100% - 80px);
    }
}
</style>