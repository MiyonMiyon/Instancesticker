/* Now Loading... (js) */
/* Author by weepjp    */

function sleep(waitMsec) {
  var startMsec = new Date();
  while (new Date() - startMsec < waitMsec);
}

var loading = document.getElementById('loading');
var contents = document.getElementById('contents');

window.addEventListener('load', function () {
   sleep(3434);
   loading.style.display = 'none';
   contents.classList.remove('hidden');
});

