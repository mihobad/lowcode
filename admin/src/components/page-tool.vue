<template>
    <div class="page-tools">
        <el-icon class="page-tools-drag">
            <Rank />
        </el-icon>
        <div class="page-tools-title">首页</div>
        <div class="page-tools-line"></div>
        <div class="page-tools-size">375*667</div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.page-tools {
    align-items: center;
    background-color: rgb(87 104 161 / 8%);
    border-radius: 8px;
    color: rgb(15 21 40 / 82%);
    cursor: pointer;
    display: flex;
    gap: 6px;
    height: 28px;
    padding: 2px 8px;
    position: absolute;
    top: -36px;
    transform-origin: bottom left;
    transition: transform .2s ease-in-out;

    &-drag {
        width: 16px;
        height: 16px;
    }

    &-title {
        flex: 1 1 0%;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: rgb(15 21 40 / 82%);
    }

    &-line {
        background-color: rgb(82 100 154 / 13%);
        height: 60%;
        width: 1px;
    }

    &-size {
        color: rgb(55 67 106 / 38%);
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        white-space: nowrap;
    }
}
</style>