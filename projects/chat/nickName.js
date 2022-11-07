export default class NickName {
	constructor() {
		this.profileName = document.querySelector('.chat__profile-name');
	}
	set(name) {
		this.name = name;
		this.profileName.textContent = name;
	}
	get() {
		return this.name;
	}
}
