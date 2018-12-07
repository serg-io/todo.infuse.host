import Host from './Host.js';
import template from './todo-list.html';

// Dependency used in the template.
import './TodoLI.js';

// Key of the local storage item to use to store all todo items.
const KEY = 'todo-items';

/**
 * Class definition for the <todo-list> custom element.
 */
export default class TodoList extends Host {
	get template() {
		return template;
	}

	/**
	 * Dispatches a "counts-updated" event when this element is added to the DOM.
	 *
	 * @method connectedCallback
	 */
	connectedCallback() {
		super.connectedCallback();
		this.dispatchCountsUpdated();
	}

	/**
	 * Returns all the todo items saved in local storage.
	 */
	get savedItems() {
		return JSON.parse(localStorage.getItem(KEY)) || [];
	}

	/**
	 * Saves all todo items to local storage.
	 */
	save() {
		// Find all elements in the list.
		const items = this.queryAll('li');

		// Convert the array of items into a JSON string and save it.
		localStorage.setItem(KEY, JSON.stringify(items));
	}

	/**
	 * Adds the given todo item to the list, saves all items, and dispatches a "counts-updated"
	 * event.
	 *
	 * @method addTodo
	 * @param {TodoLI} item The `TodoLI` instance to add to the list.
	 */
	addTodo(item) {
		this.query('ul').appendChild(item);
		this.save();
		this.dispatchCountsUpdated();
	}

	/**
	 * Removes the given item from the list, saves all remaining items, and dispatches a
	 * "counts-updated" event. This is called by an event handler in the template.
	 *
	 * @method removeItem
	 * @param {TodoLI} item The item to remove.
	 */
	removeItem(item) {
		item.remove();
		this.save();
		this.dispatchCountsUpdated();
	}

	/**
	 * If `isChecked` is `true`, it looks for all todo items that **are not completed** and sets
	 * their complete property to true. Otherwise, it looks for todo items that **are completed**
	 * and sets their complete property to `false`. After setting the complete properties, it saves
	 * all items, and dispatches a "counts-updated" event.
	 *
	 * @method toggleAll
	 * @param {boolean} isChecked Indicates whether or not all items should be completed.
	 */
	toggleAll(isChecked) {
		const selector = `li${ isChecked ? ':not([completed])' : '[completed]' }`;
		this.queryAll(selector).forEach(item => item.setCompleted(isChecked, false));
		this.save();
		this.dispatchCountsUpdated();
	}

	/**
	 * Removes all completed todo items, saves all remaining items, and dispatches a
	 * "counts-updated" event.
	 *
	 * @method clearCompleted
	 */
	clearCompleted() {
		this.queryAll('li[completed]').forEach(item => item.remove());
		this.save();
		this.dispatchCountsUpdated();
	}

	/**
	 * Dispatches a custom "counts-updated" event. The event's detail property contains the
	 * following attributes:
	 *
	 *     * `total`: Total number of todo items.
	 *     * `completed`: Number of completed items.
	 *     * `active`: Number of active (not completed) items.
	 *     * `allCompleted`: Boolean flag indicating whether or not all items are completed.
	 */
	dispatchCountsUpdated() {
		// Find all items in the list.
		const items = this.queryAll('li');
		const len = items.length;
		// Count the number of completed items.
		const completed = items.reduce((total, item) => total + (item.completed ? 1 : 0), 0);
		// The event's detail object.
		const counts = {
			total: len,
			completed,
			active: len - completed,
			allCompleted: len !== 0 && len === completed,
		};

		this.dispatch('counts-updated', counts);
	}
}

window.customElements.define('todo-list', TodoList);