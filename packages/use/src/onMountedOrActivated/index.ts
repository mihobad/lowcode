import { onMounted, onActivated, nextTick } from 'vue';

export function onMountedOrActivated(hook: () => any) {
	let mounted: boolean;

	onMounted(() => {
		hook();
		nextTick(() => {
			mounted = true;
		});
	});

	onActivated(() => {
		if (mounted) {
			hook();
		}
	});
}
