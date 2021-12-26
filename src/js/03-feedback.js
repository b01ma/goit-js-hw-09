import _, { throttle } from "lodash";

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
    submit: document.querySelector('.feedback-form button'),
};

const currentFormState = JSON.parse(localStorage.getItem('feedback-form-state'));

const onInputThrottled = throttle(onInput, 500);

if (currentFormState) {
    refs.input.value = currentFormState.email;
    refs.textarea.value = currentFormState.message;
}

refs.form.addEventListener('input', onInputThrottled);

refs.form.addEventListener('submit', onSubmit);



function onInput() {

    let formState = {};

    formState.email = refs.input.value;
    formState.message = refs.textarea.value;

    localStorage.setItem('feedback-form-state', JSON.stringify(formState));
    
};

function onSubmit(e) {
    e.preventDefault();
    console.log('submited');

    refs.form.reset();

    localStorage.removeItem('feedback-form-state');
    
}



