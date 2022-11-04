export default class UploadUserPic {
	constructor() {
		this.input = document.querySelector('.chat__profile-userpic input');
		this.init();
	}

	init() {
		this.input.addEventListener('drop', (e) => {
			const file = e.dataTransfer.items[0].getAsFile();
			const reader = new FileReader();

			reader.readAsDataURL(file);
			reader.addEventListener('load', () => {
				this.input.parentNode.style.backgroundImage = `url("${reader.result}")`;
			});
			e.preventDefault();
		});
	}
}
