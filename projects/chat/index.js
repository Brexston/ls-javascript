import './chat.html';
import NickName from './nickName';
import ListUsers from './listUsers';
import CountUsers from './countUsers';
import SendMessage from './sendMessage';
import GenerateName from './generateName';
import NotificationMsg from './NotificationMsg';

document.addEventListener('DOMContentLoaded', function () {
	init();
	new GenerateName();
});

function init() {
	let ws;

	const socketServerURI = 'ws://localhost:4000';
	const controlNickName = new NickName();
	const controlListUsers = new ListUsers();
	const controlMessage = new SendMessage();
	const controlCountUsers = new CountUsers();
	const controlNotificationMsg = new NotificationMsg();

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
				payload: {
					nickname: controlNickName.get(),
				},
			};
			ws.send(JSON.stringify(requestBody));
		}
	});

	dom.sendBtn.addEventListener('click', () => {
		if (dom.sendInput.value) {
			const requestBody = {
				event: 'message',
				payload: {
					nickname: controlNickName.get(),
					message: dom.sendInput.value,
				},
			};
			dom.sendInput.value = '';
			ws.send(JSON.stringify(requestBody));
		}
	});

	function start(socketURL) {
		ws = new WebSocket(socketURL);

		ws.onmessage = (serverResponse) => {
			const { type, payload, count, list, name } = JSON.parse(serverResponse.data);
			switch (type) {
				case 'login':
					controlListUsers.update(list);
					controlCountUsers.set(count);
					controlNotificationMsg.add(payload.nickname, 'login');
					break;
				case 'message':
					controlMessage.send(payload.nickname, payload.message);
					break;
				case 'logout':
					controlListUsers.update(list);
					controlCountUsers.set(count);
					console.log(name);
					controlNotificationMsg.add(name, 'logout');
					break;
			}
		};

		ws.onclose = () => {
			const requestBody = {
				event: 'logout',
				payload: {
					nickname: controlNickName.get(),
				},
			};
			ws.send(JSON.stringify(requestBody));
		};
	}

	start(socketServerURI);
}
