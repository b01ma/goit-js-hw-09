import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('button[type="submit"]'),
};

let formData = {};

refs.form.addEventListener('input', onInput);
refs.button.addEventListener('click', onClick);

function onInput() {
  
  formData = {
    delay: refs.form.delay.value,
    step: refs.form.step.value,
    amount: refs.form.amount.value,
  }

  return formData;

};

function onClick(event) {

  event.preventDefault();
  console.log("Погнали!");
  // console.log(formData);

  let position = 0;
  const amount = formData.amount;
  let delay = Number(formData.delay);
  const step = Number(formData.step);

  // console.log(amount)

  for (let i = 1; i <= amount; i += 1) {

    position = i;
    delay += step;

    // console.log(delay);
    // console.log(step);

    createPromise(position, delay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  };

};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve ({
        position,
        delay,
      })
    } else {
      reject({
        position,
        delay,
      })
      };
    }, delay)
    
  });
};