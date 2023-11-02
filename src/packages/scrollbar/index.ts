import type { App } from 'vue';
import EScrollbar from './src/scrollbar.vue';

EScrollbar.install = (app: App) => {
	app.component('EScrollbar', EScrollbar);
};

export { EScrollbar };
export default EScrollbar;

export type { ScrollbarProps } from './src/interface';
