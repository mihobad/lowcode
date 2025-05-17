<template>
  <div class="radio-setter">
    <el-radio-group v-model="modelValue">
      <el-radio v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'RadioSetter'
})

interface Option {
  label: string
  value: string | number | boolean
}

interface Props {
  options: Option[]
}

defineProps<Props>()

// 使用 defineModel 进行双向绑定
const modelValue = defineModel<string | number | boolean>()
</script>