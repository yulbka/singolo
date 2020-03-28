// active link anchor navigation

let header = document.querySelector('.header');
header.addEventListener('click', function(event) {  
  let target = event.target.closest('a');
  if (!target) return;   
  header.querySelectorAll('a').forEach(elem => elem.classList.remove('navigation__href_active'));
  target.classList.add('navigation__href_active');  
  if (target.classList.contains('mobile-menu__href')) closeMobileMenu();
})

document.addEventListener('scroll', onScroll);  

  
function onScroll(event) {   
  let currentPosition = window.scrollY;
  let scrollBlocks = document.querySelectorAll('.scroll');
  let links = document.querySelectorAll('.navigation__href');  
  let navBarHeight = document.querySelector('#home').offsetHeight;

  scrollBlocks.forEach((block) => {      
    if ((block.offsetTop - navBarHeight) <= currentPosition && (block.offsetTop + block.offsetHeight) > currentPosition) {
      links.forEach ((link) => {        
        link.classList.remove('navigation__href_active');
        link.classList.remove('mobile-menu__href_active');
        if (block.getAttribute('id') === link.getAttribute('href').slice(1)) {
          link.classList.add('navigation__href_active');
        }
      })
   }
  });
}

// mobile-menu

let mobileOverlay = document.querySelector('.mobile-overlay');
let hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function(event) {
  event.target.closest('.hamburger').classList.toggle('hamburger_active');
  document.querySelector('.logo').classList.toggle('logo__mobile-menu');
  mobileOverlay.classList.toggle('mobile-overlay_visible'); 
  document.querySelector('.logo').classList.add('logo_animationed');
  hideMobileMenu();
});

let closeMobileMenu = function() {
  mobileOverlay.classList.remove('mobile-overlay_visible');
  hamburger.classList.remove('hamburger_active');
  document.querySelector('.logo').classList.remove('logo__mobile-menu');  
  hideMobileMenu();
}

let hideMobileMenu = function() {
  if (mobileOverlay.classList.contains('mobile-overlay_visible')) {
    mobileOverlay.classList.remove('mobile-overlay_hidden');    
  } else {
    mobileOverlay.classList.add('mobile-overlay_hidden');    
  }  
}

// close mobile-menu by clicking on overlay

mobileOverlay.addEventListener('click', function(event) {
  let target = event.target.closest('.mobile-menu');
  if (!target) closeMobileMenu();
})


// slider carousel

let carouselItems = document.querySelectorAll('.iphone-container');
let currentItem = 0;
let isEnabled = true;


function hideItem(direction) {
	isEnabled = false;
	carouselItems[currentItem].classList.add(direction);
	carouselItems[currentItem].addEventListener('animationend', function() {
		this.classList.remove('iphone-container_active', direction);
	});
}

function showItem(direction) {   
  carouselItems[currentItem].classList.add('next', direction);  
  document.querySelector('.slider').classList.toggle('slider_carousel'); 
  carouselItems[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('iphone-container_active');
    isEnabled = true;
  })
}

document.querySelector('.arrow_prev').addEventListener('click', function() {
  if (isEnabled) {
    hideItem('to-right');    
    currentItem -= 1; 
    if (currentItem < 0) {
      currentItem = carouselItems.length - 1;
    }   
    showItem('from-left');
  }
})

document.querySelector('.arrow_next').addEventListener('click', function() {
  if (isEnabled) {
    hideItem('to-left');    
    currentItem += 1;    
    if (currentItem > carouselItems.length - 1) {
      currentItem = 0;
    }
    showItem('from-right');
  }
})

// off-on screen phone

let slider = document.querySelector('.slider');
slider.addEventListener('click', function(event) {
  let target = event.target.closest('.iphone__image, .iphone__display');
  if (!target) return;
  let screen = target.parentElement.querySelector('.iphone__display');
  screen.classList.toggle('screen-off');
})

// mix portfolio photos

let filter = document.querySelector('.filter');
filter.addEventListener('click', function(event) {
  filter.querySelectorAll('button').forEach(button => button.classList.remove('button_active'));  
  event.target.closest('button').classList.add('button_active');
  let portfolio = document.querySelector('#portfolio-images');
  let images = Array.from(portfolio.querySelectorAll('li'));
  let shuffledImages = images.sort(function() {
    return Math.random() - 0.5;
  })
  portfolio.innerHTML = '';  
  shuffledImages.forEach(image => portfolio.append(image));
})

// border around portfolio image

portfolio.addEventListener('click', function(event) {
  let target = event.target.closest('img');
  if (!target) return;
  portfolio.querySelectorAll('img').forEach(image => image.classList.remove('portfolio__image_chosen'));
  target.classList.add('portfolio__image_chosen');
})

// modal window

let modal = document.querySelector('.modal-overlay');
let form = document.forms.quote;

form.addEventListener('submit', function(event) {
  event.preventDefault();
  getModalContent();
  showModalWindow();
  form.reset();
})

modal.addEventListener('click', function(event) {
  let target = event.target.closest('.btn-close');
  if (!target) return;
  modal.classList.remove('modal-overlay_visible');
})

let getModalContent = function() {
  let theme;
  form.subject.value ? theme = `Тема: ${form.subject.value}`: theme = 'Без темы';  
  modal.querySelector('.modal-window__theme').innerText = theme;
  let description;
  form.project.value ? description = `Описание: ${form.project.value}`: description = 'Без описания';
  modal.querySelector('.modal-window__description').innerText = description;
}

let showModalWindow = function() {
  modal.classList.add('modal-overlay_visible');
}