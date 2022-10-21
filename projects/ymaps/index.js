import './index.html';

window.onload = () => {
  mapInit();
};

function mapInit() {
  const ymaps = window.ymaps;
  const reviews = [];
  const html = `
        <h3 class="review__title">Отзыв</h3>
        <form>
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
  ymaps.ready(() => {
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.65],
      zoom: 9,
    });

    myMap.events.add('click', function (e) {
      const coords = e.get('coords');
      openBalloon(coords, html);
    });

    async function openBalloon(coords, html) {
      // const myPlacemark = new ymaps.Placemark(coords, {
      //     balloonContentBody: `
      //         <h3 class="review__title">Отзыв</h3>
      //         <form>
      //             <div class="review__input">
      //                 <input type="text" name="name" placeholder="Укажите ваше имя">
      //             </div>
      //             <div class="review__input">
      //                 <input type="text" name="place" placeholder="Укажите место">
      //             </div>
      //             <div class="review__input">
      //                 <textarea name="review" placeholder="Оставьте отзыв"></textarea>
      //             </div>
      //             <button onclick="event.preventDefault();window.addNewReview(this.parentNode, ${coords})" class="review__submit">Добавить</button
      //         </form>
      //     `,
      // });
      //PlacemarkArray.push(myPlacemark)
      //myMap.geoObjects.add(myPlacemark);
      const myBalloon = myMap.balloon.open(coords, {
        contentBody: html,
      });
      console.log(myBalloon);
      // myPlacemark.balloon.events.add('close', function (e) {
      //     myMap.geoObjects.remove(myPlacemark);
      // });
    }

    window.addNewReview = function addNewReview(form, longitude, latitude) {
      const review = {
        longitude,
        latitude,
        name: form.elements.name.value,
        place: form.elements.place.value,
        review: form.elements.review.value,
      };
      reviews.push(review);
      localStorage.reviews = JSON.stringify(reviews);
    };
  });
}
