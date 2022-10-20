import './index.html';

window.onload = () => {
  mapInit();
};

function mapInit() {
  const ymaps = window.ymaps;
  ymaps.ready(() => {
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.65],
      zoom: 9,
    });

    myMap.events.add('click', function (e) {
      const coords = e.get('coords');
      addPlacemark(coords);
    });

    function addPlacemark(coords) {
      const myPlacemark = new ymaps.Placemark(coords, {
        balloonContentHeader: `<h3 class="review__title">Отзыв</h3>`,
        balloonContentBody: `
                    <div class="review__input">
                        <input type="text" placeholder="Укажите ваше имя">
                    </div>
                    <div class="review__input">
                        <input type="text" placeholder="Укажите место">
                    </div>
                    <div class="review__input">
                        <textarea placeholder="Оставьте отзыв"> </textarea>
                    </div>
                `,
        balloonContentFooter: `
                    <button class="review__submit">Добавить</button
                `,
      });

      myMap.geoObjects.add(myPlacemark);
      myPlacemark.balloon.open();
      myPlacemark.balloon.events.add('close', function (e) {
        myMap.geoObjects.remove(myPlacemark);
      });
    }

    // function test(myPlacemark) {

    //     console.log(myPlacemark.balloon)
    //     myPlacemark.balloon.events.add('click', function (e) {
    //         alert('sdsd')
    //     });
    // }
  });
}
