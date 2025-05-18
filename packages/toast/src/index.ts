import { withInstall } from '@anfu/utils';
import _Toast, { toastProps } from './Toast';
import {
	showToast,
	showLoadingToast,
	showTextToast,
	showMaskToast,
	clearToast,
	closeToast,
} from './function-call';
import './index.scss';

const Toast = withInstall(_Toast);
export default Toast;

export {
	Toast,
	toastProps,
	showToast,
	showLoadingToast,
	showTextToast,
	showMaskToast,
	clearToast,
	closeToast,
};
