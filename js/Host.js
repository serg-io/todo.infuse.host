import { CustomizedHost as InfuseCustomizedHost } from 'infuse.host';

export function CustomizedHost(BuiltInElement) {
	return class extends InfuseCustomizedHost(BuiltInElement) {
		query(selector) {
			return this.querySelector(selector);
		}

		queryAll(selector) {
			return Array.from(this.querySelectorAll(selector));
		}

		dispatch(name, detail = null) {
			this.dispatchEvent(new CustomEvent(name, { bubbles: true, cancelable: true, detail }));
		}
	};
}

export default class Host extends CustomizedHost(HTMLElement) {}