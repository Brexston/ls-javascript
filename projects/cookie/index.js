/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const cookiesMap = getCookies();
let filterValue = '';
function getCookies() {
  return document.cookie
    .split('; ')
    .filter(Boolean)
    .map((cookie) => cookie.match(/^([^=]+)=(.+)/))
    .reduce((obj, [, name, value]) => {
      obj.set(name, value);

      return obj;
    }, new Map());
}

function fillCookies() {
  const allCookies = getCookies();
  console.log(allCookies);
  listTable.innerHTML = '';

  for (const [name, value] of cookiesMap) {
    if (
      filterValue &&
      !name.toLowerCase().includes(filterValue.toLowerCase()) &&
      !value.toLowerCase().includes(filterValue.toLowerCase())
    ) {
      continue;
    }
    const html = `
			<tr>
				<th>${name}</th>
				<th>${value}</th>
				<th><button class="remove-btn">Удалить</th>
			</tr>
			`;

    listTable.insertAdjacentHTML('beforeend', html);
  }
}
fillCookies();

//Удаляем cookie
listTable.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const nameCookie = e.target.parentNode.closest('tr').querySelector('th').textContent;
    deleteCookie(nameCookie);
  }
});

function deleteCookie(name) {
  cookiesMap.delete(name);
  document.cookie = `${name}=;expires=` + new Date(0).toUTCString();
  fillCookies();
}

//Поиск по кукам
filterNameInput.addEventListener('input', function () {
  filterValue = this.value;
  fillCookies();
});

addButton.addEventListener('click', () => {
  if (!addNameInput.value) return;

  document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  cookiesMap.set(addNameInput.value, addValueInput.value);

  fillCookies();
});