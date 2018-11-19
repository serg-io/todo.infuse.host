export default class TodoItem extends HTMLElement {
	static get observedAttributes() {
		return ['text', 'completed'];
	}

	attributeChangedCallback(name, previous, current) {
		if (this.isConnected) {
			this.dispatch(`change:${ name }`, { previous, current });
			this.dispatch('change');
		}
	}

	get text() {
		return this.getAttribute('text');
	}

	set text(newText) {
		this.setAttribute('text', newText);
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

	destroy() {
		this.dispatch('destroy-todo');
	}

	dispatch(event, detail = null) {
		let ev = event;

		if (!(ev instanceof Event)) {
			ev = new CustomEvent(ev, { bubbles: true, cancelable: true, detail });
		}

		this.dispatchEvent(ev);
	}

	toJSON() {
		return {
			text: this.text,
			completed: this.completed,
		};
	}
}

window.customElements.define('todo-item', TodoItem);