import './index.html';

window.onload = () => {
  mapInit();
};

function mapInit() {
  const ymaps = window.ymaps;
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
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
      console.log('createHtml');
      const html = `
      <div class="review">
        <div class="review__list">${fillReviews(coordinates)}</div>
        <h3 class="review__title">Отзыв</h3>
        <form data-coordinates="${coordinates}">
          <div class="review__input">
            <input type="text" name="name" value="Степа" placeholder="Укажите ваше имя">
          </div>
          <div class="review__input">
            <input type="text" name="place" value="Шашлычка" placeholder="Укажите место">
          </div>
          <div class="review__input">
            <textarea name="review" placeholder="Оставьте отзыв">Еыыыыыыыыыыы</textarea>
          </div>
          <button class="review__submit">Добавить</button
        </form>
      </div>
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

    function addPlacemark(coordinates) {
      const myPlacemark = new ymaps.Placemark(coordinates.split(','), {
        balloonContentBody: createHtml(coordinates),
      });
      myMap.geoObjects.add(myPlacemark);
    }

    function closeBaloon() {
      myMap.balloon.close();
    }

    function addNewReview(form, coordinates) {
      const review = {
        coordinates,
        name: form.elements.name.value,
        place: form.elements.place.value,
        review: form.elements.review.value,
      };
      reviews.push(review);
      localStorage.reviews = JSON.stringify(reviews);
    }

    function fillReviews(coordinates) {
      console.log('fillReviews');
      let reviesHtml = '';
      for (const review of reviews) {
        if (coordinates === review.coordinates) {
          reviesHtml += `<p><b>${review.name}</b>[${review.place}] <br> ${review.review}</p>`;
        }
      }
      return reviesHtml;
    }

    function showOnMap() {
      for (const review of reviews) {
        addPlacemark(review.coordinates, createHtml(review.coordinates));
      }
    }
    showOnMap();
  });
}
