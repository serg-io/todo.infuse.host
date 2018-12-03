import Host from './Host.js';
import template from './todo-app.html';

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