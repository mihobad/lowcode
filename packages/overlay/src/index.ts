import { withInstall } from '@anfu/utils';
import _Overlay from './Overlay';
import './index.scss';

export const Overlay = withInstall(_Overlay);
export default Overlay;

export { overlayProps, type OverlayProps } from './Overlay';

declare module 'vue' {
	export interface GlobalComponents {
		lOverlay: typeof Overlay;
	}
}
