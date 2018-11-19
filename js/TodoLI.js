import template from './todo-li.html';
import { CustomizedHost } from './Host.js';

export default class TodoLI extends CustomizedHost(HTMLLIElement) {
	static get observedAttributes() {
		return ['completed'];
	}

	constructor(text) {
		super();
		console.log('li created', this.text);
		if (text) {
			this.text = text;
		}
		//this.text = text;
		console.log('text', this.text);
	}

	attributeChangedCallback(name, previous, current) {
		if (name === 'completed') {
			if (this.completed) {
				this.classList.add('completed');
			} else {
				this.classList.remove('completed');
			}
		}
	}

	get template() {
		return template;
	}

	get completed() {
		return this.hasAttribute('completed');
	}

	set completed(value) {
		if (value) {
			this.setAttribute('completed', '');
		} else {
			this.removeAttribute('completed');
		}
	}

	toggleComplete(value) {
		this.completed = value;
		this.dispatch('todo-changed');
	}

	destroy() {
		this.dispatch('destroy-todo');
	}

	toJSON() {
		const { text, completed } = this;

		return { text, completed };
	}
}

window.customElements.define('todo-li', TodoLI, { extends: 'li' });