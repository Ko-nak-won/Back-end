export class UserLSM {
	constructor() {
		this.lsId = "account";

		if (localStorage.getItem(this.lsId) === null) {
			localStorage.setItem(this.lsId, '');
		}
	}

	/**
	 * @returns {string}
	 */
	get() {
		return localStorage.getItem(this.lsId);
	}

	/**
	 * @param {string} value
	 */
	set(value) {
		return localStorage.setItem(this.lsId, value);
	}

	clear() {
		return this.set('');
	}
}