const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 }, () => {
	console.log('Server started');
});

const clients = new Set();

wss.on('connection', (wsClient) => {
	clients.add(wsClient);

	wsClient.on('message', (message) => {
		const request = JSON.parse(message.toString());
		broadcast(request);
	});
	wsClient.on('close', () => {
		clients.delete(wsClient);
	});
});

function broadcast(params) {
	let response;

	clients.forEach((client) => {
		switch (params.event) {
			case 'login':
				response = {
					type: 'login',
					payload: params.payload,
				};
				break;
			case 'message':
				response = {
					type: 'message',
					payload: params.payload,
				};
				break;
			default:
				response = {
					type: 'logout',
					payload: params.payload,
				};
				break;
		}
		client.send(JSON.stringify(response));
	});
}
