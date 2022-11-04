export default class generateName {
	constructor() {
		this.input = document.querySelector('.c-popup__input input');
		this.names = [
			'Александр',
			'Максим',
			'Михаил',
			'Марк',
			'Иван',
			'Артем',
			'Лев',
			'Дмитрий',
			'Матвей',
			'Даниил',
		];
		this.generateName();
	}
	generateName() {
		this.input.value = this.names[Math.floor(Math.random() * this.names.length)];
	}
}
