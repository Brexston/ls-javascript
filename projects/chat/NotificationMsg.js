export default class NotificationMsg {
	constructor() {
		this.notificationsBlock = document.querySelector('.chat__notification');
	}
	add(name, event) {
		let html;
		if (event === 'login') {
			html = `<div class="notification">${name} вошел в чат</div>`;
		} else {
			html = `<div class="notification">${
				name ? name : 'Аноним'
			} покинул чат</div>`;
		}
		this.notificationsBlock.insertAdjacentHTML('beforeend', html);
	}
}
