import Host from './Host.js';
import TodoLI from './TodoLI.js';
import template from './todo-header.html';

export default class TodoHeader extends Host {
	get template() {
		return template;
	}

	submit(event) {
		const input = this.query('input');
		const text = input.value.trim();

		if (text.length !== 0) {
			// const item = document.createElement('li', { is: 'todo-li' });
			// item.text = text;

			this.dispatch('todo-created', new TodoLI(text));
			input.value = '';
		}

		event.preventDefault();
		return false;
	}
}

window.customElements.define('todo-header', TodoHeader);