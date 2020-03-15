// active link anchor navigation

let navigation = document.getElementById('navigation');
navigation.addEventListener('click', function(event) {
  navigation.querySelectorAll('a').forEach(elem => elem.classList.remove('active'));
  event.target.closest('a').classList.add('active');
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
  let images = Array.from(portfolio.querySelectorAll('img'));
  let shuffledImages = images.sort(function() {
    return Math.random() - 0.5;
  })
  portfolio.innerHTML = '';
  shuffledImages.forEach(image => portfolio.append(image));
})