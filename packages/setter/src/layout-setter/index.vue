<template>
    <div class="nine-square-grid">
        <div class="grid-fixed" v-if="!isGapAuto">
            <div v-for="([row, col], index) in matrix" :key="index" class="grid-cell">
                <div class="menu-wrap" @click="handleClick(row, col)">
                    <div :class="[
                        'menu-icon',
                        rc.join('_') === `${row}_${col}` && 'active',
                        `row_${row}`,
                        `col_${col}`,
                        isColumn && 'column',
                    ]">
                        <div class="menu-line w-2"></div>
                        <div class="menu-line w-3"></div>
                        <div class="menu-line w-2"></div>
                    </div>
                    <div :class="['dot', rc.join('_') === `${row}_${col}` && 'active']"></div>
                </div>
            </div>
        </div>
        <div :class="['grid-auto', isColumn && 'column']" v-else>
            <div v-for="(item) in matrix2" :key="item" :class="['grid-auto-item', rc[0] === item && 'active']" @click="handleClick(item, item)">
                <div v-for="i in 3" class="grid-cell-wrap">
                    <div :class="['grid-cell', item]">
                        <div :class="['menu-line', i === 2 && 'menu-line__long']"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

// <align-content, justify-content>
const matrix = [
	['flex-start', 'flex-start'],
	['flex-start', 'center'],
	['flex-start', 'flex-end'],
	['center', 'flex-start'],
	['center', 'center'],
	['center', 'flex-end'],
	['flex-end', 'flex-start'],
	['flex-end', 'center'],
	['flex-end', 'flex-end'],
];

const matrix2 = ['flex-start', 'center', 'flex-end'];

const { _current } = defineProps({
	_current: {
		type: Object,
	},
});

const rc = defineModel({
	default: ['flex-start', 'flex-start'],
});

const isColumn = computed(() => {
	return _current?.flow === 'column';
});

const isGapAuto = computed(() => {
	return _current?.gapType === 'auto';
});

watch(
	() => _current?.flow,
	(val) => {
		if (val === 'row' || val === 'wrap') {
			rc.value = ['flex-start', 'flex-start'];
		}
		if (val === 'column') {
			rc.value = ['center', 'flex-start'];
		}
	},
);

const handleClick = (row: string, col: string) => {
	rc.value = [row, col];
};
</script>

<style scoped lang="scss">
.nine-square-grid {
    width: 100%;
    height: 80px;
    border: 1px solid rgba(58, 85, 138, .25);
    border-radius: 8px;


    .grid-fixed {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);

        .grid-cell {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

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

                    &.row_flex-start.col_flex-start {
                        justify-content: flex-start;
                        align-items: flex-start;
                    }

                    &.row_flex-start.col_center {
                        justify-content: flex-start;
                        align-items: center;
                    }

                    &.row_flex-start.col_flex-end {
                        justify-content: flex-start;
                        align-items: flex-end;
                    }

                    &.row_center.col_flex-start {
                        justify-content: center;
                        align-items: flex-start;
                    }

                    &.row_center.col_center {
                        justify-content: center;
                        align-items: center;
                    }

                    &.row_center.col_flex-end {
                        justify-content: center;
                        align-items: flex-end;
                    }

                    &.row_flex-end.col_flex-start {
                        justify-content: flex-end;
                        align-items: flex-start;
                    }

                    &.row_flex-end.col_center {
                        justify-content: flex-end;
                        align-items: center;
                    }

                    &.row_flex-end.col_flex-end {
                        justify-content: flex-end;
                        align-items: flex-end;
                    }

                    .menu-line {
                        &.w-2 {
                            height: 2px;
                            width: 8px;
                        }

                        &.w-3 {
                            height: 2px;
                            width: 12px;
                        }
                    }
                }

                &.active {
                    opacity: 1;
                }

                &.row_flex-start.col_flex-start,
                &.row_flex-start.col_center,
                &.row_flex-start.col_flex-end {
                    justify-content: flex-start;
                    align-items: flex-start;
                }

                &.row_center.col_flex-start,
                &.row_center.col_center,
                &.row_center.col_flex-end {
                    justify-content: center;
                    align-items: center;
                }

                &.row_flex-end.col_flex-start,
                &.row_flex-end.col_center,
                &.row_flex-end.col_flex-end {
                    justify-content: flex-end;
                    align-items: flex-end;
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

    .grid-auto {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .grid-auto-item {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &.active {
                .menu-line {
                    opacity: 1;
                }

               .dot {
                    opacity: 0;
               }
            }

            &:hover {
               .menu-line {
                    opacity: 0.8;
                }
               .dot {
                    opacity: 0;
               }
            }

            .grid-cell.flex-start {
                align-items: flex-start;
                justify-content: center;
            }
            
            .grid-cell.center {
                align-items: center;
                justify-content: center;
            }

            .grid-cell.flex-end {
                align-items: flex-end;
                justify-content: center;
            }
        }

        .grid-cell-wrap {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .grid-cell {
            position: relative;
            width: 12px;
            height: 10px;
            display: flex;
            justify-content: center;
            align-items: center;

            .menu-line {
                width: 2px;
                height: 8px;
                background-color: rgb(85 70 255);
                opacity: 0;

                &__long {
                    height: 12px;
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
            }
        }

        &.column {
            flex-direction: row;

            .menu-line {
                width: 8px;
                height: 2px;
                background-color: rgb(85 70 255);

                &__long {
                    width: 12px;
                }
            }

            .grid-auto-item {
                flex-direction: column;
                justify-content: space-between;
            }

            .grid-cell.flex-start {
                justify-content: flex-start;
                align-items: center;
            }
            
            .grid-cell.center {
                justify-content: center;
                align-items: center;
            }

            .grid-cell.flex-end {
                justify-content: flex-end;
                align-items: center;
            }
        }
    }
}
</style>"