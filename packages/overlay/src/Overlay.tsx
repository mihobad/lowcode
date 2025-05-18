import {
	defineComponent,
	Transition,
	type CSSProperties,
	type PropType,
	type ExtractPropTypes,
} from 'vue';
import { useLazyRender } from '@anfu/use';
import {
	createNamespace,
	truthProp,
	numericProp,
	extend,
	getZIndexStyle,
	unknownProp,
	isDef,
} from '@anfu/utils';

const [name, bem] = createNamespace('overlay');

export const overlayProps = {
	show: Boolean,
	zIndex: numericProp,
	duration: numericProp,
	className: unknownProp,
	lazyRender: truthProp,
	forbidClick: truthProp,
	customStyle: Object as PropType<CSSProperties>,
};

export type OverlayProps = ExtractPropTypes<typeof overlayProps>;

export default defineComponent({
	name,

	props: overlayProps,

	setup(props, { slots, emit }) {
		const lazyRender = useLazyRender(() => props.show || !props.lazyRender);

		const onClickOverlay = () => {
			emit('clickOverlay');
		};

		const renderOverlay = lazyRender(() => {
			const style: CSSProperties = extend(
				getZIndexStyle(props.zIndex),
				props.customStyle,
			);

			if (isDef(props.duration)) {
				style.animationDuration = `${props.duration}s`;
			}

			return (
				<div
					v-show={props.show}
					style={style}
					class={[bem([props.forbidClick ? 'forbid' : '']), props.className]}
					onClick={onClickOverlay}
				>
					{slots.default?.()}
				</div>
			);
		});

		return () => (
			<Transition v-slots={{ default: renderOverlay }} name="l-fade" appear />
		);
	},
});
