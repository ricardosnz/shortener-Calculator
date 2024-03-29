const prevScreen = document.querySelector('.calc-prev');
const currentScreen = document.querySelector('.calc-current');

const numberContainer = document.querySelector('.calc-numbers');

const equalBtn = document.querySelector('.calc-result');

const numbers = ['.', 0, '/', 1, 2, 3, 4, 5, 6, 7, 8, 9].reverse();

const htmlListNumber = numbers
  .map((number) => {
    const classname = number !== '/' ? 'number' : 'operator';
    return `<li class="${classname}">${number}</li>`;
  })
  .join('');

numberContainer.innerHTML = htmlListNumber;

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operator');

numberButtons.forEach((number) => {
  number.addEventListener('click', () => {
    if (number.innerText === '.' && currentScreen.innerText.includes('.'))
      return;
    currentScreen.innerHTML += number.innerText;
  });
});

operationButtons.forEach((operator) => {
  operator.addEventListener('click', () => {
    let textScreen = currentScreen.innerHTML;
    const textOperador = operator.innerText;
    if (
      (!currentScreen.innerText.length && textOperador !== '-') ||
      (currentScreen.innerText[0] === '-' &&
        textOperador === '-' &&
        currentScreen.innerText.length < 2)
    ) {
      return;
    }
    if (textOperador.includes('trending_flat')) {
      currentScreen.innerHTML = textScreen.slice(0, -1);
      return;
    } else if (operator.innerText == '-' && !currentScreen.innerHTML[0]) {
      currentScreen.innerHTML = '-';
    } else if (currentScreen.innerHTML.includes('-') || operator.innerText) {
      totalOperation();
      prevScreen.innerHTML = ` ${currentScreen.innerText} ${operator.innerText} `;
      currentScreen.innerHTML = '';
    }
  });
});

equalBtn.childNodes.forEach((total) => {
  total.addEventListener('click', () => {
    if (total.innerText.includes('Reiniciar')) {
      currentScreen.innerHTML = '';
      prevScreen.innerHTML = '';
    } else if (total.innerText.includes('=')) {
      total.innerHTML = `= <span class="material-symbols-outlined"> task </span>`;
      setTimeout(() => (total.innerHTML = '='), 500);
      totalOperation();
    }
  });
});

function operationValidation({ value1, value2, op }) {
  if (op === '+') return Number(value1) + Number(value2);
  else if (op === '-') return Number(value1) - Number(value2);
  else if (op === 'x') return Number(value1) * Number(value2);
  else if (op === '/') return Number(value1) / Number(value2);
}

function totalOperation() {
  if (prevScreen.innerText && currentScreen.innerText) {
    currentScreen.innerHTML = operationValidation({
      value1: prevScreen.innerText.split(' ')[0],
      value2: currentScreen.innerText,
      op: prevScreen.innerText.split(' ')[1],
    });
    prevScreen.innerHTML = '';
  }
}
