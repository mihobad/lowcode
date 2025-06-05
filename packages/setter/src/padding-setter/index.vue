<template>
    <div class="inner-setter w-full">
        <div class="flex justify-end items-center">
            <el-input-number v-if="!inner.isMixed" v-model="inner.padding" :disabled="inner.isMixed" :controls="false" />
            <div :class="['inner-setter-icon', inner.isMixed && 'mixed']" @click="mixedChangeHandle">
                <Icon1 />
            </div>
        </div>
        <div class="inner-setter-mixed mt-2" v-if="inner.isMixed">
            <el-input-number class="mixed-item" v-for="item in mixedArray" :key="item.name" v-model="inner[item.name]"
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
		name: 'paddingLeft',
	},
	{
		icon: Icon3,
		name: 'paddingTop',
	},
	{
		icon: Icon4,
		name: 'paddingRight',
	},
	{
		icon: Icon5,
		name: 'paddingBottom',
	},
];

const inner = defineModel({
	type: Object,
});

const mixedChangeHandle = () => {
	inner.value = {
		...inner.value,
		isMixed: !inner.value.isMixed,
	};
};

watch(
	() => inner.value?.padding,
	(nv) => {
		if (nv) {
			inner.value = {
				...inner.value,
				paddingTop: nv,
				paddingRight: nv,
				paddingBottom: nv,
				paddingLeft: nv,
			};
		}
	},
);
</script>

<style scoped lang="scss">
.inner-setter {
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