import { ref, watch, getCurrentInstance } from 'vue';
import { isObject, extend, sleep } from '@anfu/utils';
import { mountComponent, usePopupState } from '@anfu/use';
import type { ToastOptions, ToastType, ToastWrapperInstance } from './types';
import Toast from './Toast';

const defaultOptions: ToastOptions = {
	type: 'text',
	message: '',
	duration: 2000,
	position: 'middle',
	forbidClick: false,
	icon: '',
};

type ShowToastOptions = ToastOptions & {
	once?: boolean;
};

let instanceCounter = 0;
let queue: ToastWrapperInstance[] = [];

const currentOptions = extend({}, defaultOptions);

function parseOptions(message: string | ToastOptions): ToastOptions {
	if (isObject(message)) {
		return message;
	}
	return { message };
}

function createInstance(once?: boolean) {
	const instanceId = `toast-${++instanceCounter}`;
	const { instance, unmount } = mountComponent({
		setup() {
			const message = ref('');
			const { state, open, close, toggle } = usePopupState();

			const onClosed = async () => {
				if (once) {
					queue = queue.filter((item) => instanceId !== item.id);
					await sleep(300);
					unmount();
				}
			};

			const render = () => {
				const attrs: Record<string, unknown> = {
					onClosed,
					'onUpdate:show': toggle,
				};

				return <Toast {...state} {...attrs} />;
			};

			// support dynamic message
			watch(message, (nv) => {
				state.message = nv;
			});

			watch(
				() => state.show,
				(nv) => {
					if (!nv) {
						onClosed();
					}
				},
			);
			(getCurrentInstance() as any).render = render;

			return {
				open,
				close,
				IS_ONCE: once,
				id: instanceId,
			};
		},
	});

	return instance as ToastWrapperInstance;
}

function getInstance(once?: boolean) {
	const _queue = queue.filter((item) => !item.IS_ONCE);

	if (!_queue.length || once) {
		const instance = createInstance(once);

		if (!once) {
			// add !once to the front of the queue
			queue = [instance, ...queue];
		}

		if (once) {
			queue.push(instance);
			return instance;
		}
	}

	return queue[0];
}

export function showToast(options: string | ShowToastOptions = {}) {
	const toast = getInstance((options as ShowToastOptions)?.once);
	const parsedOptions = parseOptions(options);

	toast.open(extend({}, currentOptions, parsedOptions));

	return toast;
}

const createMethod = (type: ToastType) => (options: string | ShowToastOptions) => showToast(extend({ type }, parseOptions(options)));

export const showLoadingToast = createMethod('loading');

export const showTextToast = createMethod('text');

export const showMaskToast = createMethod('mask');

export const clearToast = () => {
	queue.forEach((toast) => toast.close());
	queue = [];
};

export const closeToast = (id: string) => {
	const toast = queue.find((item) => item.id === id);
	toast?.close();
	queue = queue.filter((item) => item.id !== id);
};
