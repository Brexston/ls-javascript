export default class CountUsers {
	constructor() {
		this.countUsers = document.querySelector('.chat__info-participant');
	}
	set(count) {
		this.countUsers.textContent = this.declensionWord(count);
	}
	declensionWord(value) {
		const words = ['участник', 'участника', 'участников'];
		value = Math.abs(value) % 100;
		const num = value % 10;
		if (value > 10 && value < 20) return `${value} ${words[2]}`;
		if (num > 1 && num < 5) return `${value} ${words[1]}`;
		if (num === 1) return `${value} ${words[0]}`;
		return `${value} ${words[2]}`;
	}
}
