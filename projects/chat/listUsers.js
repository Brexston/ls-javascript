export default class ListUsers {
	constructor() {
		this.listUsers = document.querySelector('.chat__users-list');
		this.listUsersArray = new Set();
	}

	buildHtml() {
		this.listUsersArray.forEach((user) => {
			const div = document.createElement('div');
			div.classList.add('chat__user');
			div.textContent = user;
			this.listUsers.appendChild(div);
		});
	}

	add(name) {
		this.listUsersArray.add(name);
		this.buildHtml();
	}
	remove(name) {
		this.listUsersArray.add(name);
		this.buildHtml();
	}
}
