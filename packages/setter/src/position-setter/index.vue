<template>
    <div class="position-setter w-full">
        <div class="flex items-center justify-end">
            <div class="position-setter-select">
                <el-select v-model="position.positionType">
                    <el-option label="相对定位" value="relative" />
                    <el-option label="绝对定位" value="absolute" />
                    <el-option label="固定定位" value="fixed" />
                </el-select>
            </div>
        </div>
        <div class="position-setter-rtlb mt-2" v-if="position.positionType !== 'relative'">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="dot"></div>
            <div class="t">
                <el-input-number v-model="position.top" :controls="false" size="small">
                    <template #prefix>
                        <span>T</span>
                    </template>
                </el-input-number>
            </div>
            <div class="r">
                <el-input-number v-model="position.right" :controls="false" size="small">
                    <template #prefix>
                        <span>R</span>
                    </template>
                </el-input-number>
            </div>
            <div class="b">
                <el-input-number v-model="position.bottom" :controls="false" size="small">
                    <template #prefix>
                        <span>B</span>
                    </template>
                </el-input-number>
            </div>
            <div class="l">
                <el-input-number v-model="position.left" :controls="false" size="small">
                    <template #prefix>
                        <span>L</span>
                    </template>
                </el-input-number>
            </div>
        </div>
        <div class="position-setter-zindex mt-2" v-if="position.positionType !== 'static'">
            <div class="flex items-center justify-between">
                <div class="position-setter-zindex-label">层级</div>
                <div class="flex-1">
                    <el-input-number v-model="position.zIndex" :controls="false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const position = defineModel({
	type: Object,
	default: () => {
		return {
			positionType: 'relative',
		};
	},
});
</script>
<style lang="scss" scoped>
.position-setter {
    width: 100%;
    margin-top: -32px;

    &-select {
        width: calc(100% - 80px);
    }

    &-rtlb {
        position: relative;
        width: 100%;
        background: rgba(6, 7, 9, .02);
        border: 1px solid rgba(6, 7, 9, .15);
        border-radius: 8px;
        height: 104px;

        .line1 {
            position: absolute;
            width: 100%;
            height: 1px;
            background: rgb(84 62 247);
            top: 50%;
            transform: translateY(-50%);
        }

        .line2 {
            position: absolute;
            width: 1px;
            height: 100%;
            background: rgb(84 62 247);
            left: 50%;
            transform: translateX(-50%);
        }

        .dot {
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgb(84 62 247);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .t,
        .r,
        .b,
        .l {
            position: absolute;
            width: 78px;
            height: 22px;

            :deep(.el-input-number--small) {
                width: 100%;
            }
        }

        .t {
            left: 50%;
            top: 13px;
            transform: translate(-50%);
        }

        .r {
            bottom: 50%;
            right: 23px;
            transform: translateY(50%);
        }

        .b {
            left: 50%;
            bottom: 13px;
            transform: translate(-50%);

        }

        .l {
            bottom: 50%;
            left: 23px;
            transform: translateY(50%);
        }
    }

    &-zindex {
        height: 32px;

        :deep(.el-input-number) {
            width: 100%;
        }

        &-label {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: rgba(6, 7, 9, 0.5);
            font-size: 12px;
            font-style: normal;
            width: 80px;
        }
    }
}
</style>