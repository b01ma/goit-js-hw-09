// Add imports above this line
// Описан в документации
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryRef = document.querySelector('.gallery');

// 1. Создаем разметку
const galleryMarkUp = galleryItems.map(({ preview, original, description }) => {
    
    return ` 
   <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
    `

}).join(" ");

// 2. Рендерим разметку
galleryRef.insertAdjacentHTML('beforeend', galleryMarkUp);

// 3. Вешаем слушатель событий на список эелментов 
galleryRef.addEventListener('click', onClickImage);

// 4. Добавляем библиотеку и создаем бэкдром с модальным окном + обьект настроек
let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

// 5. Создаем функцию действий при клике и вызов lightbox 
function onClickImage(e) {

    e.preventDefault();

    if (e.target.nodeName !== 'IMG') {
        return;
    }
    
    gallery.on('show.simplelightbox');
};


