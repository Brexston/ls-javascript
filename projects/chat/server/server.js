const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 }, () => {
	console.log('Server started');
});

const clients = new Map();
const clientsNames = {};

wss.on('connection', (wsClient) => {
	clients.set(wsClient, {});
	wsClient.on('message', (message) => {
		const request = JSON.parse(message.toString());
		broadcast(request);
	});
	wsClient.on('close', (message, reason) => {
		clients.delete(wsClient);
		broadcast(message, wsClient.nickname);
	});
});

function broadcast(params, nickname) {
	let response;
	for (const client of clients.keys()) {
		switch (params.event) {
			case 'login':
				clientsNames[params.payload.nickname] = params.payload.nickname;
				if (!client.nickname) {
					client.nickname = params.payload.nickname;
				}
				response = {
					type: 'login',
					payload: params.payload,
					list: clientsNames,
					count: clients.size,
				};
				break;
			case 'message':
				response = {
					type: 'message',
					payload: params.payload,
				};
				break;
			default:
				delete clientsNames[nickname];
				response = {
					type: 'logout',
					payload: params.payload,
					list: clientsNames,
					count: clients.size,
					name: nickname,
				};

				break;
		}
		client.send(JSON.stringify(response));
	}
}
