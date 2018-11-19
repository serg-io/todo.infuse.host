import TodoItem from './TodoItem.js';

const KEY = 'todo-items';

const storage = window.localStorage;

export default class TodoItems extends HTMLElement {
	constructor() {
		super();
		this.addEventListener('change', () => this.save());
		this.addEventListener('destroy-todo', event => this.destroyTodo(event.target));
	}

	connectedCallback() {
		let items = JSON.parse(storage.getItem(KEY)) || [];

		items.forEach(({ text, completed }) => {
			const item = new TodoItem();

			item.text = text;
			item.completed = completed;

			this.add(item, false);
		});
	}

	save() {
		const items = Array.from(this.children);
		storage.setItem(KEY, JSON.stringify(items));
	}

	add(item, save = true) {
		this.appendChild(item);
		this.dispatch('todo-added', item);

		if (save) {
			this.save();
		}
	}

	destroyTodo(item) {
		item.remove();
		item.dispatch('todo-removed');
		this.save();
	}

	completeAll() {
		Array.from(this.children).forEach(item => {
			if (!item.completed) {
				item.completed = true;
			}
		});
	}

	activateAll() {
		Array.from(this.children).forEach(item => {
			if (item.completed) {
				item.completed = false;
			}
		});
	}

	dispatch(name, detail = null) {
		this.dispatchEvent(new CustomEvent(name, { bubbles: true, cancelable: true, detail }));
	}
}

window.customElements.define('todo-items', TodoItems);