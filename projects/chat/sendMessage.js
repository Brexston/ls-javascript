export default class sendMessage {
	constructor() {
		this.messageBlock = document.querySelector('.chat__message');
	}
	send(name, message) {
		const html = `
        <div class="message">
            <div class="message___img"></div>
            <div class="message__block">
            <div class="message__name">${name}</div>
                <div class="message__text">${message}
                    <span>${new Date().toLocaleTimeString().slice(0, -3)}</span>
                </div>
            </div>
        </div>          
        `;
		this.messageBlock.insertAdjacentHTML('beforeend', html);
	}
}
