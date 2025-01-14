import './index.html';

window.onload = () => {
  mapInit();
};

function mapInit() {
  const ymaps = window.ymaps;
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const placemarks = [];
  ymaps.ready(() => {
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.65],
      zoom: 9,
    });

    const clusterer = new ymaps.Clusterer({
      groupByCoordinates: true,
      clusterDisableClickZoom: true,
      clusterOpenBalloonOnClick: false,
    });
    clusterer.options.set('hasBallon', false);
    clusterer.events.add('click', function (e) {
      e.preventDefault();
      const coordinates = e.get('target').getGeoObjects()[0].geometry._coordinates;
      openBalloon(coordinates);
    });

    myMap.geoObjects.add(clusterer);

    function showOnMap() {
      for (const review of reviews) {
        addPlacemark(review.coordinates);
      }
    }
    showOnMap();

    myMap.events.add('click', function (e) {
      e.preventDefault();
      const coordinates = e.get('coords');
      openBalloon(coordinates);
    });

    async function openBalloon(coords) {
      await myMap.balloon.open(coords, createHtml(coords));
      const form = document.querySelector('form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const coordinates = form.getAttribute('data-coordinates');
        addNewReview(form, coordinates);
        addPlacemark(coordinates);
        closeBaloon();
      });
    }

    function createHtml(coordinates) {
      const html = `
      <div class="review">
        <div class="review__list">${fillReviews(coordinates)}</div>
        <h3 class="review__title">Отзыв</h3>
        <form data-coordinates="${coordinates}">
          <div class="review__input">
            <input type="text" name="name" placeholder="Укажите ваше имя">
          </div>
          <div class="review__input">
            <input type="text" name="place"  placeholder="Укажите место">
          </div>
          <div class="review__input">
            <textarea name="review" placeholder="Оставьте отзыв"></textarea>
          </div>
          <button class="review__submit">Добавить</button
        </form>
      </div>
	  		`;
      return html;
    }

    function addPlacemark(coordinates) {
      const myPlacemark = new ymaps.Placemark(coordinates.split(','));

      myPlacemark.events.add('click', (e) => {
        e.stopPropagation();
        openBalloon(myPlacemark.geometry._coordinates);
      });

      placemarks.push(myPlacemark);
      myMap.geoObjects.add(myPlacemark);
      clusterer.add(placemarks);
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
      let reviesHtml = '';
      coordinates = coordinates.join(',');
      for (const review of reviews) {
        if (coordinates === review.coordinates) {
          reviesHtml += `<p><b>${review.name}</b>[${review.place}] <br> ${review.review}</p>`;
        }
      }
      return reviesHtml;
    }
  });
}
