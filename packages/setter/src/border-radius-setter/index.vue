<template>
    <div class="border-radius-setter w-full">
        <div class="flex justify-end items-center">
            <el-input-number v-if="!radius.isMixed" v-model="radius.borderRadius" :disabled="radius.isMixed" :controls="false" />
            <div :class="['border-radius-setter-icon', radius.isMixed && 'mixed']" @click="mixedChangeHandle">
                <Icon1 />
            </div>
        </div>
        <div class="border-radius-setter-mixed mt-2" v-if="radius.isMixed">
            <el-input-number class="mixed-item" v-for="item in mixedArray" :key="item.name" v-model="radius[item.name]"
                :controls="false">
                <template #prefix>
                    <component :is="item.icon" />
                </template>
            </el-input-number>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import Icon1 from './icon1.vue';
import Icon2 from './icon2.vue';
import Icon3 from './icon3.vue';
import Icon4 from './icon4.vue';
import Icon5 from './icon5.vue';

const mixedArray = [
	{
		icon: Icon2,
		name: 'topLeft',
	},
	{
		icon: Icon3,
		name: 'topRight',
	},
	{
		icon: Icon4,
		name: 'bottomLeft',
	},
	{
		icon: Icon5,
		name: 'bottomRight',
	},
];

const radius = defineModel({
	type: Object,
});

const mixedChangeHandle = () => {
	radius.value = {
		...radius.value,
		isMixed: !radius.value.isMixed,
	};
};

watch(
	() => radius.value?.borderRadius,
	(nv) => {
		if (nv) {
			radius.value = {
				...radius.value,
				topLeft: nv,
				topRight: nv,
				bottomLeft: nv,
				bottomRight: nv,
			};
		}
	},
);
</script>

<style scoped lang="scss">
.border-radius-setter {
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

        &:hover,
        &.mixed {
            background-color: rgb(87 104 161 / 8%);
            color: rgb(81 71 255);
        }
    }

    &-mixed {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-gap: 12px;

        .mixed-item {
            width: auto;
        }
    }
}
</style>