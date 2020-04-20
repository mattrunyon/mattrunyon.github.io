// $('.button-collapse').sideNav({
//   menuWidth: 300, // Default is 240
//   closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
//   edge: 'right'
// }
// );

function setProgressBar() {
  let body = document.querySelector('body');
  var winTop = body.scrollTop;
  var docHeight = body.scrollHeight;
  var winHeight = body.clientHeight;
  var totalScroll = (winTop + winHeight) / docHeight * 100;
  document.getElementById('main-progressbar').style.height = `${totalScroll}%`;
}

window.addEventListener('scroll', setProgressBar);

function copyToClipboard() {
  document.getElementById('email-hidden').select();
  document.execCommand("Copy");
  M.toast({html: 'Copied email to clipboard', displayLength: 3000});
}

let bgGen;
let bgString;
let bgContainer;
document.addEventListener('DOMContentLoaded', function() {
  bgContainer = document.getElementById('bgContainer');
  let bgWidth = parseFloat(getComputedStyle(bgContainer).width);
  let bgHeight = parseFloat(getComputedStyle(bgContainer).height);
  let fontWidth = parseFloat(getComputedStyle(document.getElementById('bgHelper')).width);
  let fontHeight = parseFloat(getComputedStyle(document.getElementById('bgHelper')).height);

  bgContainer.style.padding = `${(bgHeight % fontHeight) / 2}px ${(bgWidth % fontWidth) / 2}px`;
  let bgRows = Math.floor(bgHeight / fontHeight);
  let bgCols = Math.floor(bgWidth / fontWidth);

  bgString = new Array(bgRows * bgCols + 1).join('\u2003');

  bgContainer.textContent = bgString;
  bgGen = setInterval(randomBgFill, 6);

  setProgressBar();
});

function stopBgGen() {
  clearInterval(bgGen);
}

function randomBgFill() {
  let rand = Math.floor(Math.random() * (bgString.length));
  let num = Math.floor(Math.random() * 3);
  if (num === 2) {
    num = '\u2003';
  }
  bgString = bgString.substr(0, rand) + num + bgString.substr(rand + 1);
  bgContainer.textContent = bgString;
}

