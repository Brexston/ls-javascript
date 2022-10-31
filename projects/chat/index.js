import './chat.html';
import NickName from './nickName';
import ListUsers from './listUsers';

window.onload = () => {
	init();
};

function init() {
	let ws;

	const socketServerURI = 'ws://localhost:4000';
	const controlNickName = new NickName();
	const controllistUsers = new ListUsers();

	const dom = {
		loginBtn: document.querySelector('.c-popup__button button'),
		loginInput: document.querySelector('.c-popup__input input'),
		sendBtn: document.querySelector('.chat__send-btn'),
		sendInput: document.querySelector('.chat__send-input'),
	};

	dom.loginBtn.addEventListener('click', () => {
		if (dom.loginInput.value) {
			controlNickName.set(dom.loginInput.value);
			document.body.classList.remove('popup-opened');
			const requestBody = {
				event: 'login',
				payload: { nickname: controlNickName.get() },
			};
			ws.send(JSON.stringify(requestBody));
		}
	});

	dom.sendBtn.addEventListener('click', () => {
		console.log(dom.sendInput.value);
		if (dom.sendInput.value) {
			const requestBody = {
				event: 'message',
				payload: { nickname: controlNickName.get() },
			};
			ws.send(JSON.stringify(requestBody));
		}
	});

	function start(socketURL) {
		ws = new WebSocket(socketURL);

		ws.onmessage = (serverResponse) => {
			const { type, payload } = JSON.parse(serverResponse.data);

			switch (type) {
				case 'login':
					controllistUsers.add(payload.nickname);
					break;
				case 'message':
					console.log(payload.nickname);
					controllistUsers.buildHtml();
					break;
			}
		};

		ws.onclose = () => {
			alert('test');
		};
	}

	start(socketServerURI);
}
