
import './style.css'

import * as PIXI from 'pixi.js'
import { drawRNA, getBaseTexture } from '@nxsandbox/rna';

// Setup PIXI
const app = new PIXI.Application({
  resolution: devicePixelRatio
});

document.body.appendChild(app.view);

function resize() {
	app.renderer.resize(window.innerWidth, window.innerHeight);    
}

resize();
window.addEventListener('resize', resize);

// Draw RNA
const container = new PIXI.Container();
container.x = window.innerWidth / 2;
container.y = window.innerHeight / 2;
app.stage.addChild(container);
const { sequence, xarray, yarray } = drawRNA();
for (let i = 0; i < sequence.length; ++i) {  
  const texture = getBaseTexture(sequence.baseArray[i]);
  const baseSprite = new PIXI.Sprite(PIXI.Texture.from(texture));
  container.addChild(baseSprite);
}

// Animate RNA
const ticker = new PIXI.Ticker();
let time = 0;
let progress = 0;
ticker.add(() => {  
  time += ticker.deltaMS / 1000;  
  progress = Math.min(1, time / 3);
  for (let i = 0; i < sequence.length; ++i) {  
    const sprite = container.getChildAt(i);
    sprite.x = xarray[i] * progress;
    sprite.y = yarray[i] * progress;
  }
});
ticker.start();

