import './TodoLI.js';
import Host from './Host.js';
import template from './todo-list.html';

const KEY = 'todo-items';

const storage = window.localStorage;

export default class TodoList extends Host {
	constructor() {
		super();
		this.addEventListener('todo-changed', () => this.save());
		this.addEventListener('destroy-todo', event => this.removeItem(event.target));
	}

	get template() {
		return template;
	}

	get savedItems() {
		return JSON.parse(storage.getItem(KEY)) || [];
	}

	addTodo(todoLI) {
		this.query('ul').appendChild(todoLI);
		this.save();
	}

	removeItem(todoLI) {
		todoLI.remove();
		this.save();
	}

	save() {
		const items = Array.from(this.query('ul').children);
		storage.setItem(KEY, JSON.stringify(items));
	}
}

window.customElements.define('todo-list', TodoList);