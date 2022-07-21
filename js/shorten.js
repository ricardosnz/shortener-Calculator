import getShorten from '../services/getShorten';

const shortenContainer = document.querySelector('.shorten');

const shortenForm = document.querySelector('.shorten-form');
const shortenInput = document.getElementById('shorten-entry');

let listShortens = [];
let JSONShorten = window.localStorage.getItem('list');

loadShorten();
const deleteShortenBtns = document.querySelectorAll('.shorten-delete');
const shortenContent = document.querySelectorAll('.shorten-content');

const copyShortenBtns = document.querySelectorAll('.shorten-copy');
let shortenResults = document.querySelectorAll('.shorten-result');

function loadShorten() {
  if (JSONShorten) {
    let shortens = JSON.parse(JSONShorten);
    listShortens = listShortens.concat(shortens);
    if (listShortens.length >= 1) {
      listShortens.map((shorted) => {
        if (shorted) return createShort(shorted);
      });
    }
  }
}

function createShort(content) {
  let newShorten = document.createElement('article');
  newShorten.classList.add('shorten-content');

  newShorten.innerHTML = `
  <p class="shorten-delete"><span class="material-symbols-outlined">
  cancel
  </span></p>
  <h3>${content.linkOriginal}</h3>
  <div>
    <h2>Resultado: <span class="shorten-result">${
      content.linkOne || content.linkTwo
    }</span></h2>
    <button class="shorten-copy">Copiar</button>
  </div>`;
  return shortenContainer.appendChild(newShorten);
}

shortenForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  let { linkOne, linkTwo, linkOriginal } = await getShorten(shortenInput.value);
  createShort({ linkOne, linkTwo, linkOriginal });
  listShortens = [{ linkOne, linkTwo, linkOriginal }, ...listShortens];
  window.localStorage.setItem('list', JSON.stringify(listShortens));
  shortenInput.value = '';
});

shortenForm.children[1].addEventListener('click', () => {
  shortenForm.children[1].innerHTML = `Acorlarlo <span class="material-symbols-outlined"> arrow_forward_ios </span>`;
  setTimeout(() => ((shortenForm.children[1].innerHTML = 'Acortalo'), 400));
});

deleteShortenBtns.forEach((btn, indexBtn) => {
  btn.addEventListener('click', () => {
    shortenContent[indexBtn].setAttribute(
      'class',
      'shorten-content remove-content'
    );
    listShortens = listShortens.filter((item, index) => index !== indexBtn);
    window.localStorage.setItem('list', JSON.stringify(listShortens));
  });
});

copyShortenBtns.forEach((btn, indexBtn) => {
  btn.addEventListener('click', () => {
    window.getSelection().selectAllChildren(shortenResults[indexBtn]);
    document.execCommand('Copy');
    btn.innerHTML = `Copiado <span class="material-symbols-outlined">
    check_circle
    </span>`;
    setTimeout(() => (btn.innerHTML = 'Copiar'), 300);
  });
});
