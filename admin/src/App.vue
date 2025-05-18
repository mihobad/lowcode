<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { zhCn } from 'element-plus/es/locale/index.mjs';
const locale = computed(() => zhCn);
</script>

<style scoped lang="scss">

</style>
