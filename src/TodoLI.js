import template from './todo-li.html';
import { CustomHost } from './Host.js';

/**
 * Class definition for the list items. It extends the `HTMLLIElement` class (<li> element).
 */
export default class TodoLI extends CustomHost(HTMLLIElement) {
	get template() {
		return template;
	}

	get completed() {
		return this.hasAttribute('completed');
	}

	set completed(newValue) {
		this.setCompleted(newValue);
	}

	/**
	 * Changes the todo item to completed.
	 *
	 * @method setCompleted
	 * @param {boolean} newValue If true, the todo item would be changed to completed. Otherwise,
	 *     the item becomes **not** completed (or active).
	 * @param {boolean} [dispatchChange=true] Indicates whether or not a "todo-changed" event
	 *     should be dispatched after changing the todo item. The "todo-changed" event is used by
	 *     the <todo-list> element to save the change.
	 * @param {boolean} [dispatchCompleted=true] Indicates whether or not a "todo-completed" event
	 *     should be dispatched after changing the todo item. The "todo-completed" event is used in
	 *     the template to infuse the checkbox.
	 */
	setCompleted(newValue, dispatchChange = true, dispatchCompleted = true) {
		if (newValue !== this.completed) {
			if (newValue) {
				this.setAttribute('completed', '');
			} else {
				this.removeAttribute('completed');
			}

			if (dispatchChange) {
				this.dispatch('todo-changed');
			}

			if (dispatchCompleted) {
				this.dispatch(new Event('todo-completed'));
			}
		}
	}

	/**
	 * This getter indicates whether or not the edit mode is currently enabled.
	 */
	get editing() {
		return this.classList.contains('editing');
	}

	/**
	 * This setter is used to toggle the edit mode. When the edit mode is enabled, the input field
	 * is focused.
	 */
	set editing(value) {
		if (value) {
			this.classList.add('editing');
			this.query('.edit').focus();
		} else {
			this.classList.remove('editing');
		}
	}

	/**
	 * Disables the edit mode and reverts changes made to the input field.
	 *
	 * @method undo
	 */
	undo() {
		this.editing = false;
		this.query('.edit').value = this.text;
	}

	/**
	 * Changes the text of the todo item to the current value of the input field and dispatches a
	 * "todo-changed" event. If the input field is empty, the text isn't changed and the event isn't
	 * dispatched. This is meant to be called when the form is submitted (when the "Enter" key is
	 * pressed and the input field is focused).
	 *
	 * @method submit
	 * @param {Event} event The form "submit" event.
	 */
	submit(event) {
		const text = this.query('.edit').value.trim();

		if (text.length > 0) {
			this.text = text;
			this.editing = false;
			this.dispatch('todo-changed');
		}

		event.preventDefault();
		return false;
	}

	/**
	 * Dispatches a "destroy-todo" event. The todo item is **not** actually removed by this method.
	 * The "destroy-todo" event is used by the <todo-list> element to remove and save all remaining
	 * items.
	 *
	 * @method destroy
	 */
	destroy() {
		this.dispatch('destroy-todo');
	}

	/**
	 * This allows the <todo-list> element to easily convert all todo items to a JSON string and
	 * save them to local storage.
	 *
	 * @method toJSON
	 */
	toJSON() {
		const { text, completed } = this;

		return { text, completed };
	}
}

window.customElements.define('todo-li', TodoLI, { extends: 'li' });