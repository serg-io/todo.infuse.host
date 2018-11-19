import Host from './Host.js';
import template from './todo-app.html';

import './TodoHeader.js';
import './TodoList.js';

export default class TodoApp extends Host {
	get template() {
		return template;
	}
}

window.customElements.define('todo-app', TodoApp);