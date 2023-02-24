export default function (content, container) {
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
  return container.appendChild(newShorten);
}