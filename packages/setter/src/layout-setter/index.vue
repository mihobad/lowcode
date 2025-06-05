<template>
    <div class="nine-square-grid">
        <div v-for="([row, col], index) in matrix" :key="index" class="grid-cell">
            <div class="menu-wrap" @click="handleClick(row, col)">
                <div :class="[
                    'menu-icon',
                    `align-${row}`,
                    `place-${col}`,
                    rc === `${row}_${col}` && 'active',
                    _current?.flow === 'column' && 'column'
                ]">
                    <div class="menu-line w-2"></div>
                    <div class="menu-line w-3"></div>
                    <div class="menu-line w-2"></div>
                </div>
                <div :class="['dot', rc === `${row}_${col}` && 'active']"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';

const matrix = [
	['start', 'start'],
	['center', 'start'],
	['end', 'start'],
	['start', 'center'],
	['center', 'center'],
	['end', 'center'],
	['start', 'end'],
	['center', 'end'],
	['end', 'end'],
];

const { _current } = defineProps({
	_current: {
		type: Object,
	},
});

const rc = defineModel({
	default: 'start_start',
});

watch(
	() => _current?.flow,
	(val) => {
		if (val === 'row' || val === 'wrap') {
			rc.value = 'start_start';
		}
		if (val === 'column') {
			rc.value = 'center_start';
		}
	},
);

const handleClick = (row: string, col: string) => {
	rc.value = `${row}_${col}`;
};
</script>

<style scoped lang="scss">
.nine-square-grid {
    width: 100%;
    height: 80px;
    border: 1px solid rgba(58, 85, 138, .25);
    border-radius: 8px;
    cursor: pointer;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);

    .grid-cell {
        display: flex;
        justify-content: center;
        align-items: center;

        .menu-wrap {
            position: relative;
            width: 22px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                .dot {
                    opacity: 0;
                }

                .menu-icon {
                    opacity: 0.8;
                }
            }
        }

        .menu-icon {
            width: 12px;
            height: 10px;
            display: flex;
            flex-direction: row;
            gap: 2px;
            opacity: 0;

            &.column {
                flex-direction: column;

                .menu-line.w-2 {
                    height: 2px;
                    width: 8px;
                }

                .menu-line.w-3 {
                    height: 2px;
                    width: 12px;
                }


                &.align-start {
                    align-items: flex-start;
                }

                &.align-center {
                    align-items: center;
                }

                &.align-end {
                    align-items: flex-end;
                }
            }

            &.place-start {
                align-items: flex-start;
            }

            &.place-center {
                align-items: center;
            }

            &.place-end {
                align-items: flex-end;
            }

            &.active {
                opacity: 1;
            }

            .menu-line {
                background-color: rgb(85 70 255);
                border-radius: 2px;

                &.w-2 {
                    width: 2px;
                    height: 8px;
                }

                &.w-3 {
                    width: 2px;
                    height: 12px;
                }
            }
        }

        .dot {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #3a558a;
            opacity: 1;

            &.active {
                opacity: 0;
            }
        }
    }
}
</style>"