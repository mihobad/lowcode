<template>
  <div>text</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
// import { fetchJson } from '@/api/client';

defineOptions({
	name: 'TextClient',
	components: {},
});

const { json, componentCode } = defineProps({
	componentCode: {
		type: String,
	},
	json: {
		type: Object,
	},
});

const jsonShema = ref();
const list = ref<any>(null);

const finialProps = computed(() => {
	return (jsonShema.value || json)?.props || {};
});
const finialEvents = computed(() => {
	return (jsonShema.value || json)?.events || {};
});
const finialData = computed(() => {
	return list.value || json?.data?.list || [];
});

const style = computed(() => {
	const _sty = Object.fromEntries(Object.entries(finialProps.value).filter(([key]) => key.startsWith('--')));

	return {
		..._sty,
	};
});

const init = async () => {
	// if (componentCode) {
	//   const { componentBasicInfo } = await fetchJson({
	//     toastError: false,
	//     params: {
	//       componentCode
	//     }
	//   })
	//   try {
	//     jsonShema.value = JSON.parse(componentBasicInfo || '{}')
	//   } catch (error) {
	//     console.error('jsonShema', error)
	//   }
	// }
};

init();
</script>

<style scoped lang="scss"></style>