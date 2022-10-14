/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {});

export function createDiv() {
  const newDiv = document.createElement('div');
  newDiv.classList.add('draggable-div');
  newDiv.style.width = `${Math.random() * 50 + 50}px`;
  newDiv.style.height = `${Math.random() * 50 + 50}px`;
  newDiv.style.background = randomColor();
  newDiv.style.left = `${Math.random() * 1280}px`;
  newDiv.style.top = `${Math.random() * 720}px`;
  newDiv.draggable = true;
  return newDiv;
}

function randomColor() {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += parseInt(Math.random() * 16).toString(16);
  }
  return color;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
