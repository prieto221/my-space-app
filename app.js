// Data
import {
  sunData,
  mercuryData,
  venusData,
  earthData,
  marsData,
  jupiterData,
  saturnData,
  uranusData,
  neptuneData,
} from './textdata.js';

// Classes
import { Body, Ring } from './planet.js';

// HTML elements
const bodiesEl = document.querySelector('#bodies');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn5 = document.querySelector('#btn5');
const orbits = document.querySelectorAll('.orbit');
const settings = document.querySelector('#settings');
const settingsBtn = document.querySelector('#settings-btn');
const planetImage = document.querySelector('.planet-image');
const header = document.querySelector('#header');
const paragraph = document.querySelector('#paragraph');
const canvasEl = document.querySelector('.canvas');
const saturnRealEl = document.querySelector('.saturn-real');
const infoContainer = document.querySelector('.info-container');
const escTip = document.querySelector('.esc-tip');

// SaturnReal (saturn img on canvas)
saturnRealEl.style.top = 488 - 32 / 2 + 'px';
saturnRealEl.style.left = 480 - 32 / 2 + 'px';
saturnRealEl.style.height = 57 + 'px';
saturnRealEl.style.width = 76 + 'px';
saturnRealEl.style.transform = 'rotate()';

// Objects
const sun = new Body(80, 500, 'sun', sunData);
const mercury = new Body(8, 500, 'mercury', mercuryData);
const venus = new Body(16, 500, 'venus', venusData);
const earth = new Body(18, 500, 'earth', earthData);
const mars = new Body(16, 500, 'mars', marsData);
const jupiter = new Body(40, 500, 'jupiter', jupiterData);
const saturn = new Body(32, 500, 'saturn', saturnData);
const saturnRing = new Ring(32, 500, 'saturn-ring');
const uranus = new Body(26, 500, 'uranus', uranusData);
const neptune = new Body(24, 500, 'neptune', neptuneData);

// Audio
const starTrekAudio = new Audio('./music/startrek.mp3');

// infocontainer Ease In animation
function myEaseInAni() {
  if (opacityCounter >= 1) {
    clearInterval(myEaseInInterval);
  } else if (opacityCounter < 1) {
    opacityCounter += 0.1;
    infoContainer.style.opacity = opacityCounter;
  }
}

// infocontainer Ease Out animation
function myEaseOutAni() {
  if (opacityCounter <= 0) {
    clearInterval(myEaseOutInterval);
    infoContainer.classList.remove('showInfoContainer');
  } else if (opacityCounter > 0) {
    opacityCounter -= 0.1;
    infoContainer.style.opacity = opacityCounter;
  }
}

// escTip Ease In animation
let escTipOpacityCounter = 0;
function myEaseInAni2() {
  if (escTipOpacityCounter < 1) {
    escTipOpacityCounter += 0.1;
    escTip.style.opacity = escTipOpacityCounter;
  } else {
    clearInterval(escWarnInterval);
    escTipOpacityCounter = 0;
    escTipCount++;
  }
}

/////// Event listeners

// Window 'esc' deselect
window.addEventListener('keydown', () => {
  if (document.querySelector('.selected')) {
    document.querySelector('.selected').classList.remove('selected');
    document.querySelector('.isClicked').classList.remove('isClicked');
    infoContainer.classList.remove('showInfoContainer');
    escTip.style.opacity = '0';
    escTipOpacityCounter = 0;
    clearTimeout(escWarnTimeout);
    clearInterval(escWarnInterval);
  }
});
// Planet event listeners
let allBodies = [
  sun,
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
];
let opacityCounter = 0;
let myEaseInInterval = null;
let myEaseOutInterval = null;
let escWarnTimeout = null;
let escWarnInterval = null;
let escTipCount = 0;
let selectedPlanet = null;
let clickedPlanet = null;
function showEscTip() {
  escWarnInterval = setInterval(myEaseInAni2, 48);
}

allBodies.forEach((body) => {
  // Mouse Over
  document.querySelector(`#${body.name}`).addEventListener('mouseover', () => {
    if (!document.querySelector('.isClicked')) {
      planetImage.src = body.image;
      header.innerHTML = body.infoName;
      paragraph.innerHTML = body.info;
      document.querySelector('#data-rank').innerHTML = body.rank;
      document.querySelector('#data-distance').innerHTML = body.distance;
      document.querySelector('#data-orbit-length').innerHTML = body.orbitTime;
      infoContainer.classList.add('showInfoContainer');
      document.querySelector(`#${body.name}`).classList.add('selected');
      clearInterval(myEaseInInterval);
      clearInterval(myEaseOutInterval);
      myEaseInInterval = setInterval(myEaseInAni, 34);
    }
  });

  // Mouse Out
  document.querySelector(`#${body.name}`).addEventListener('mouseout', () => {
    if (!document.querySelector('.isClicked')) {
      clearInterval(myEaseInInterval);
      clearInterval(myEaseOutInterval);
      myEaseOutInterval = setInterval(myEaseOutAni, 34);
      document.querySelector(`#${body.name}`).classList.remove('selected');
    }
  });

  // Click
  document.querySelector(`#${body.name}`).addEventListener('click', () => {
    // (if there is no element with the class .isClicked)
    if (!document.querySelector('.isClicked')) {
      // (clear the ease in/out setIntervals)
      clearInterval(myEaseInInterval);
      clearInterval(myEaseOutInterval);
      // (show the infoContainer)
      infoContainer.style.opacity = '1';
      // (add relevant classes to element)
      document.querySelector(`#${body.name}`).classList.add('selected');
      document.querySelector(`#${body.name}`).classList.add('isClicked');
      // (start a timer that shows the "press Esc to deselect" message after 2s)
      escWarnTimeout = setTimeout(showEscTip, escTipCount === 0 ? 200 : 10000);
    }
  });
});

// Settings menu toggle
settingsBtn.addEventListener('click', () =>
  settings.classList.toggle('hideSettings')
);

// btn1 Toggle orbits
btn1.addEventListener('click', () => {
  orbits.forEach((item) => item.classList.toggle('hide'));
});

// btn2 Space background
btn2.addEventListener('click', () => {
  canvasEl.classList.toggle('space');
  document.querySelectorAll('.orbit').forEach((item) => {
    item.classList.toggle('space');
  });
});

// btn3 Saturn img button
btn3.addEventListener('click', () => saturnRealEl.classList.toggle('show'));

// btn4 star trek music
let btn4counter = 0;
btn4.addEventListener('click', () => {
  if (btn4counter == 0) {
    starTrekAudio.play();
    btn4counter++;
  } else if (btn4counter == 1) {
    starTrekAudio.pause();
    btn4counter--;
  }
});

// btn5 hide info container
btn5.addEventListener('click', () =>
  infoContainer.classList.toggle('showInfoContainer')
);

export default bodiesEl;
