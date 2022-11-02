const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 }, () => {
	console.log('Server started');
});

const clients = new Set();
const clientsTest = {};

wss.on('connection', (wsClient) => {
	clients.add(wsClient);
	wsClient.on('message', (message) => {
		const request = JSON.parse(message.toString());
		broadcast(request);
	});
	wsClient.on('close', (message) => {
		clients.delete(wsClient);
	});
});

function broadcast(params) {
	let response;
	clients.forEach((client) => {
		switch (params.event) {
			case 'login':
				clientsTest[params.payload.nickname] = params.payload.nickname;
				response = {
					type: 'login',
					payload: params.payload,
					list: clientsTest,
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
				//console.log(clientsTest)
				console.log(params);
				response = {
					type: 'logout',
					payload: params.payload,
					list: clientsTest,
				};
				break;
		}
		client.send(JSON.stringify(response));
	});
}
