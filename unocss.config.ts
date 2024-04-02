import * as u from 'unocss';
import { presetAio } from 'untlsn-unocss';


export default u.defineConfig({
	theme: {
		colors: {
			bg: {
				primary: {
					dark:  '#1F2C36',
					light: '#FAFAFA',
				},
				secondary: {
					dark:  '#2A3743',
					light: '#FFFFFF',
				},
			},
		},
	},
	presets: [
		u.presetUno(),
		u.presetWind(),
		u.presetIcons({
			extraProperties: {
				display:       'inline-block',
				'line-height': '1em',
			},
		}),
		u.presetTypography(),
		u.presetWebFonts(),
		presetAio(),
	],
	transformers: [
		u.transformerDirectives(),
		u.transformerCompileClass(),
		u.transformerVariantGroup(),
	],
});
