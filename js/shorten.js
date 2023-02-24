import getShorten from '../services/getShorten';
import createShort from './createShort';
import loadAndParserShortens from './loadAndParserShortens';

const shortenContainer = document.querySelector('.shorten');

const shortenForm = document.querySelector('.shorten-form');
const shortenInput = document.getElementById('shorten-entry');

const JSONShorten = window.localStorage.getItem('shorts');
let listShortens = loadAndParserShortens(JSONShorten, (shorted) =>
  createShort(shorted, shortenContainer)
);

const deleteShortenBtns = document.querySelectorAll('.shorten-delete');
const shortenContent = document.querySelectorAll('.shorten-content');

const copyShortenBtns = document.querySelectorAll('.shorten-copy');
let shortenResults = document.querySelectorAll('.shorten-result');


shortenForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const { linkOne, linkTwo, linkOriginal } = await getShorten(
    shortenInput.value
  );
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
