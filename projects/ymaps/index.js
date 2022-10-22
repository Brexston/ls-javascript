import './index.html';

window.onload = () => {
  mapInit();
};

function mapInit() {
  const ymaps = window.ymaps;
  const reviews = [];
  ymaps.ready(() => {
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.65],
      zoom: 9,
    });

    myMap.events.add('click', function (e) {
      const coordinates = e.get('coords');
      openBalloon(coordinates);
    });

    function openBalloon(coords) {
      myMap.balloon.open(coords, createHtml(coords));
    }

    function createHtml(coordinates) {
      const html = `
			<h3 class="review__title">Отзыв</h3>
			<form data-coordinates="${coordinates}">
				<div class="review__input">
					<input type="text" name="name" placeholder="Укажите ваше имя">
				</div>
				<div class="review__input">
					<input type="text" name="place" placeholder="Укажите место">
				</div>
				<div class="review__input">
					<textarea name="review" placeholder="Оставьте отзыв"></textarea>
				</div>
				<button class="review__submit">Добавить</button
			</form>
	  		`;
      return html;
    }

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('review__submit')) {
        const form = e.target.closest('form');
        const coordinates = form.getAttribute('data-coordinates');
        form.addEventListener('submit', (e) => e.preventDefault());
        addNewReview(form, coordinates);
        addPlacemark(coordinates);
        closeBaloon();
      }
    });

    function addPlacemark(coordinates, form) {
      const myPlacemark = new ymaps.Placemark(coordinates.split(','), {
        balloonContentBody: form,
      });
      myMap.geoObjects.add(myPlacemark);
    }

    function closeBaloon() {
      myMap.balloon.close();
    }

    function addNewReview(form, longitude, latitude) {
      const review = {
        longitude,
        latitude,
        name: form.elements.name.value,
        place: form.elements.place.value,
        review: form.elements.review.value,
      };
      reviews.push(review);
      localStorage.reviews = JSON.stringify(reviews);
    }
  });
}
