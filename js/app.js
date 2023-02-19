window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js')
      console.log('Service worker register success', reg)
    } catch (e) {
      console.log('Service worker register fail')
    }
  }

  await loadPosts()
})


// async function loadPosts() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=11')
//   const data = await res.json()

//   const container = document.querySelector('#posts')
//   container.innerHTML = data.map(toCard).join('\n')
// }

// function toCard(post) {
//   return `
//     <div class="card">
//       <div class="card-title">
//         ${post.title}
//       </div>
//       <div class="card-body">
//         ${post.body}
//       </div>
//     </div>
//   `
// }

async function loadPosts() {
  const body = document.querySelector('body');

const resultFinal = document.querySelector('.result__modal_info');
const result = document.querySelector('.result');
const form = document.querySelector('#formScore');
const inputParams = document.querySelectorAll('.form__price');
const button = document.querySelector('.button');
const btnResets = document.querySelectorAll('.reset');

const resultScore = (price1, quantity1, price2, quantity2) => {
  let result1 = price1 / quantity1;
  let result2 = price2 / quantity2;

  let benefitFirst, benefitLast;

  const option1 = "Выгоднее покупать товар №1";
  const option2 = "Выгоднее покупать товар №2";
  const optionEvenli = "Стоимость обоих товаров одинаковая";

  const сalculatingBenefits = () => {
    benefitFirst = Math.abs(Math.round((result2 * quantity1 - price1)*100)/100);
    benefitLast = Math.abs(Math.round((result1 * quantity2 - price2)*100)/100);
  };

  if (result1 < result2) {
    optionEnd = option1;
    сalculatingBenefits();
  } else {
    if (result1 > result2) {
      optionEnd = option2;
      сalculatingBenefits();
    } else {
      optionEnd = optionEvenli;
      return (resultFinal.innerHTML = `
      <h3 class="result__title">${optionEvenli}</h3>
    `)
    }
  };

  return (resultFinal.innerHTML = `
    <h3 class="result__title">${optionEnd}</h3>
    <p class="result__text">Выгода при покупке в объёме(количестве) первого товара
    составит - ${benefitFirst} ₽</p>    
    <p class="result__text">Выгода при покупке в объёме(количестве) второго товара
    составит - ${benefitLast} ₽</p>
  `)
}


form.addEventListener('submit', (event) => { 
  event.preventDefault();
  const firstPrice = form.querySelector('#firstPrice').value;
  const firstQuantity = form.querySelector('#firstQuantity').value;
  const lastPrice = form.querySelector('#lastPrice').value;
  const lastQuantity = form.querySelector('#lastQuantity').value;

  result.classList.toggle('open');
  body.classList.add('noscroll');

  resultScore(firstPrice, firstQuantity, lastPrice, lastQuantity);
});


inputParams.forEach((param, index) => {
  param.addEventListener('change', (event) => {
    
    if (param.value === '0') {
      alert('Введнное в поле значение не может быть равно "0"! Давайте попробуем снова!');
      location.reload();
    };

    param.disabled = true;
  });
});


btnResets.forEach((btnReset) => {
  btnReset.addEventListener('click', () => {
    result.classList.remove('open');
    location.reload();
  });
});






}
