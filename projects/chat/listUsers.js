export default class ListUsers {
	constructor() {
		this.listUsers = document.querySelector('.chat__users-list');
	}

	buildHtml(list) {
		this.listUsers.innerHTML = '';
		for (const user in list) {
			const div = document.createElement('div');
			div.classList.add('chat__user');
			div.textContent = list[user];
			this.listUsers.appendChild(div);
		}
	}
	update(list) {
		this.buildHtml(list);
	}
}
