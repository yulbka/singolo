let navigation = document.getElementById('navigation');
navigation.addEventListener('click', function(event) {
  navigation.querySelectorAll('a').forEach(elem => elem.classList.remove('active'));
  event.target.closest('a').classList.add('active');
})