import { createNamespace } from '@anfu/utils';
import {
	defineComponent,
	type ExtractPropTypes,
	type PropType,
	type CSSProperties,
} from 'vue';
import LOverlay from '@anfu/overlay';

const [name, bem] = createNamespace('modal');

const modalProps = {
	show: Boolean,
	customStyle: Object as PropType<CSSProperties>,
};

export type ModalProps = ExtractPropTypes<typeof modalProps>;

export default defineComponent({
	name,

	props: modalProps,

	setup(props, { slots }) {
		const renderModal = () => {
			return <div class={bem()}>{slots['default']?.()}</div>;
		};

		return () => (
			<LOverlay {...props} v-slots={{ default: renderModal }}></LOverlay>
		);
	},
});
