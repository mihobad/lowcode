<template>
    <div class="outer-setter w-full">
        <div class="flex justify-end items-center">
            <el-input-number v-if="!outer.isMixed" v-model="outer.margin" :disabled="outer.isMixed" :controls="false" />
            <div :class="['outer-setter-icon', outer.isMixed && 'mixed']" @click="mixedChangeHandle">
                <Icon1 />
            </div>
        </div>
        <div class="outer-setter-mixed mt-2" v-if="outer.isMixed">
            <el-input-number class="mixed-item" v-for="item in mixedArray" :key="item.name" v-model="outer[item.name]"
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
		name: 'marginLeft',
	},
	{
		icon: Icon3,
		name: 'marginTop',
	},
	{
		icon: Icon4,
		name: 'marginRight',
	},
	{
		icon: Icon5,
		name: 'marginBottom',
	},
];

const outer = defineModel({
	type: Object,
});

const mixedChangeHandle = () => {
	outer.value = {
		...outer.value,
		isMixed: !outer.value.isMixed,
	};
};

watch(
	() => outer.value?.margin,
	(nv) => {
		if (nv) {
			outer.value = {
				...outer.value,
				marginTop: nv,
				marginRight: nv,
				marginBottom: nv,
				marginLeft: nv,
			};
		}
	},
);
</script>

<style scoped lang="scss">
.outer-setter {
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