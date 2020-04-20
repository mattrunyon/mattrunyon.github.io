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
let bgArr = [];
let bgContainer;
document.addEventListener('DOMContentLoaded', function() {
  M.Sidenav.init(document.querySelectorAll('.sidenav'), {
    menuWidth: 300,
    closeOnClick: true,
    edge: 'right'
  });

  bgContainer = document.getElementById('bgContainer');
  let bgWidth = parseFloat(getComputedStyle(bgContainer).width);
  let bgHeight = parseFloat(getComputedStyle(bgContainer).height);
  let fontWidth = parseFloat(getComputedStyle(document.getElementById('bgHelper')).width);
  let fontHeight = parseFloat(getComputedStyle(document.getElementById('bgHelper')).height);

  bgContainer.style.padding = `${(bgHeight % fontHeight) / 2}px ${(bgWidth % fontWidth) / 2}px`;
  let bgRows = Math.floor(bgHeight / fontHeight);
  let bgCols = Math.floor(bgWidth / fontWidth);

  let s = new Array(bgCols + 1).join('\u2003');
  for (let i = 0; i < bgRows; i++) {
    let row = document.createElement('div');
    row.classList.add('bgRow');
    row.textContent = s.slice(0);
    bgContainer.appendChild(row);
    bgArr.push(row);
  }

  bgGen = setInterval(randomBgFill, 6);

  setProgressBar();
});

function stopBgGen() {
  clearInterval(bgGen);
}

function randomBgFill() {
  let row = Math.floor(Math.random() * bgArr.length);
  let col = Math.floor(Math.random() * bgArr[0].textContent.length);
  let num = Math.floor(Math.random() * 3);
  if (num === 2) {
    num = '\u2003';
  }

  let rowString = bgArr[row].textContent;
  rowString = rowString.substr(0, col) + num + rowString.substr(col + 1);
  bgArr[row].textContent = rowString;
}

