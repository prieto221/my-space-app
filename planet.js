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

const bodiesEl = document.getElementById('bodies');
// Planet class
export class Body {
  constructor(
    _size,
    _pos,
    _name,
    _data,
    _rank,
    _distance,
    _orbitTime,
    _info,
    _img
  ) {
    this.size = _size;
    this.pos = _pos;
    this.name = _name;
    this.infoName = _data.name;
    this.rank = _data.rank;
    this.distance = _data.distance;
    this.orbitTime = _data.orbitTime;
    this.info = _data.info;
    this.image = _data.image;
    this.isSelected = false;
    this.isClicked = false;

    const newDiv = document.createElement('div');
    newDiv.classList.add('body');
    newDiv.id = _name;
    newDiv.style.top = _pos - _size / 2 + 'px';
    newDiv.style.left = _pos - _size / 2 + 'px';
    newDiv.style.height = _size + 'px';
    newDiv.style.width = _size + 'px';
    bodiesEl.appendChild(newDiv);
  }
}
// Ring class
export class Ring {
  constructor(_size, _pos, _name, _img) {
    this.size = _size;
    this.pos = _pos;
    this.name = _name;
    const newDiv = document.createElement('div');
    newDiv.classList.add('body');
    newDiv.id = _name;
    newDiv.style.top = _pos - _size / 5 + 'px';
    newDiv.style.left = _pos - _size + 'px';
    newDiv.style.height = _size / 4 + 'px';
    newDiv.style.width = _size * 2 + 'px';
    bodiesEl.appendChild(newDiv);
  }
}
