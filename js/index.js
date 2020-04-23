document.addEventListener('DOMContentLoaded', function() {
  M.Slider.init(document.querySelectorAll('.slider'), { interval: 4000 });

  M.Sidenav.init(document.querySelectorAll('.sidenav'), {
    menuWidth: 300,
    edge: 'right'
  });

  M.Modal.init(document.querySelectorAll('.modal'), { });

  M.Materialbox.init(document.querySelectorAll('.materialboxed'), {});

  document.querySelectorAll('.slides img').forEach(elem => {
    elem.addEventListener('click', slideOnClick);
  });

  document.querySelectorAll('.modal-close').forEach(elem => {
    elem.addEventListener('click', closeModal);
  });

  initBackground();
  window.addEventListener('resize', resizeBackground);

  setProgressBar();
});

function slideOnClick(e) {
  e.stopPropagation();

  let slider = M.Slider.getInstance(e.target.closest('.slider'));
  slider.pause();

  let temp = e.target.cloneNode();
  temp.classList.add('materialboxed', 'active');
  temp.onclick = undefined;
  temp.style.position = 'absolute';
  temp.style.left = '0';
  temp.style.top = '0';
  e.target.parentElement.prepend(temp);
  M.Materialbox.init(temp, {
    onCloseEnd: function() {
      temp.parentElement.parentElement.removeChild(temp.parentElement);
      setTimeout(function() {
        slider.next();
        slider.start();
      }, 500);
    }
  });
  temp.click();
}

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
function initBackground() {
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
}

function resizeBackground() {
  bgContainer = document.getElementById('bgContainer');
  let bgWidth = parseFloat(getComputedStyle(bgContainer).width);
  let bgHeight = parseFloat(getComputedStyle(bgContainer).height);
  let fontWidth = parseFloat(getComputedStyle(document.getElementById('bgHelper')).width);
  let fontHeight = parseFloat(getComputedStyle(document.getElementById('bgHelper')).height);

  bgContainer.style.padding = `${(bgHeight % fontHeight) / 2}px ${(bgWidth % fontWidth) / 2}px`;
  let bgRows = Math.floor(bgHeight / fontHeight);
  let bgCols = Math.floor(bgWidth / fontWidth);

  while (bgRows < bgArr.length) { // Shrinking number of rows
    let elem = bgArr.pop();
    elem.parentElement.removeChild(elem);
  }
  while (bgRows > bgArr.length) { // Increasing number of rows
    let row = document.createElement('div');
    row.classList.add('bgRow');

    let s = '';
    for (let i = 0; i < bgCols; i++) {
      s += '\u2003';
    }

    row.textContent = s;
    bgContainer.appendChild(row);
    bgArr.push(row);
  }

  if (bgCols < bgArr[0].textContent.length) { // Decrease number of cols
    for (let elem of bgArr) {
      elem.textContent = elem.textContent.substr(0, bgCols + 1);
    }
  } else if (bgCols > bgArr[0].textContent.length) { // Increase number of cols
    for (let elem of bgArr) {
      let s = elem.textContent;
      while (s.length < bgCols) {
        s += '\u2003';
      }
      elem.textContent = s;
    }
  }
}

function stopBgGen() {
  clearInterval(bgGen);
}

function randomBgFill() {
  let row = Math.floor(Math.random() * bgArr.length);
  let col = Math.floor(Math.random() * bgArr[0].textContent.length);
  let num = Math.floor(Math.random() * 3);
  num = num === 2 ? '\u2003' : num;

  let rowString = bgArr[row].textContent;
  rowString = rowString.substr(0, col) + num + rowString.substr(col + 1);
  bgArr[row].textContent = rowString;
}

function closeModal(e) {
  let elem = e.target;
  M.Modal.getInstance(elem.closest('.modal')).close();
}

