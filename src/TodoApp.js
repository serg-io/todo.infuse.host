import Host from './Host.js';
import template from './todo-app.html';

/**
 * Import all the required CSS.
 * In development, the CSS will be added to the <head> by the style-loader.
 * In produciton, the CSS will be extracted into a seperate file by the MiniCssExtractPlugin and a
 * <link> element will be added to the <head>.
 */
import 'todomvc-app-css/index.css';
import './style.css';

// Dependencies used in the template.
import './TodoHeader.js';
import './TodoList.js';

/**
 * Class definition for the <todo-app> custom element.
 */
export default class TodoApp extends Host {
	get template() {
		return template;
	}
}

window.customElements.define('todo-app', TodoApp);