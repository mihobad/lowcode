import { InputSetter } from './input-setter';
import { ColorSetter } from './color-setter';
import { RadioSetter } from './radio-setter';
import { SelectSetter } from './select-setter';
import { SwitchSetter } from './switch-setter';
import { NumberSetter } from './number-setter';
import { LayoutSetter } from './layout-setter';
import { TabRadioSetter } from './tab-radio-setter';
import { BorderRadiusSetter } from './border-radius-setter';
import { PaddingSetter } from './padding-setter';
import { MarginSetter } from './margin-setter';
import { BorderStyleSetter } from './border-style-setter';
import { PositionSetter } from './position-setter';
import { SizeSetter } from './size-setter';

export {
	InputSetter,
	ColorSetter,
	RadioSetter,
	SelectSetter,
	SwitchSetter,
	NumberSetter,
	LayoutSetter,
	TabRadioSetter,
	BorderRadiusSetter,
	PaddingSetter,
	MarginSetter,
	BorderStyleSetter,
	PositionSetter,
	SizeSetter,
};

const install = (app: any) => {
	app.component('InputSetter', InputSetter);
	app.component('ColorSetter', ColorSetter);
	app.component('RadioSetter', RadioSetter);
	app.component('SelectSetter', SelectSetter);
	app.component('SwitchSetter', SwitchSetter);
	app.component('NumberSetter', NumberSetter);
	app.component('LayoutSetter', LayoutSetter);
	app.component('TabRadioSetter', TabRadioSetter);
	app.component('BorderRadiusSetter', BorderRadiusSetter);
	app.component('PaddingSetter', PaddingSetter);
	app.component('MarginSetter', MarginSetter);
	app.component('BorderStyleSetter', BorderStyleSetter);
	app.component('PositionSetter', PositionSetter);
	app.component('SizeSetter', SizeSetter);
};

export default install;
