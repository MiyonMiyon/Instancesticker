/* Now Loading... (js) */
/* Author by weepjp    */

var loading = document.getElementById('loading');
var contents = document.getElementById('contents');

window.addEventListener('load', function () {
   loading.style.display = 'none';
   contents.classList.remove('hidden');
});

