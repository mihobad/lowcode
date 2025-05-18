import { InputSetter } from './input-setter';
import { ColorSetter } from './color-setter';
import { RadioSetter } from './radio-setter';
import { SelectSetter } from './select-setter';
import { SwitchSetter } from './switch-setter';
import { NumberSetter } from './number-setter';

export { InputSetter, ColorSetter, RadioSetter, SelectSetter, SwitchSetter, NumberSetter };

const install = (app: any) => {
	app.component('InputSetter', InputSetter);
	app.component('ColorSetter', ColorSetter);
	app.component('RadioSetter', RadioSetter);
	app.component('SelectSetter', SelectSetter);
	app.component('SwitchSetter', SwitchSetter);
	app.component('NumberSetter', NumberSetter);
};

export default install;
