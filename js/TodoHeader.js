import Host from './Host.js';
import TodoLI from './TodoLI.js';
import template from './todo-header.html';

/**
 * Class definition for the <todo-header> custom element.
 */
export default class TodoHeader extends Host {
	get template() {
		return template;
	}

	/**
	 * Creates a `TodoLI` using the text of the input field in this element and dispatches a
	 * "todo-created" event using the instantiated `TodoLI` as its detail value. This is meant to
	 * be used as the callback for the submit event.
	 *
	 * @method submit
	 * @param {Event} event The "submit" event.
	 */
	submit(event) {
		const input = this.query('input');
		const text = input.value.trim();

		if (text.length !== 0) {
			const item = new TodoLI();
			item.text = text;

			this.dispatch('todo-created', item);
			input.value = '';
		}

		event.preventDefault();
		return false;
	}
}

window.customElements.define('todo-header', TodoHeader);