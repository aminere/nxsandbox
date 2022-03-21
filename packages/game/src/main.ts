
import './style.css'

import * as PIXI from 'pixi.js'
import { computeRNA, IRNA, RNABase } from '@nxsandbox/rna';
import { State } from '@nxsandbox/state';

// import { drawRNA } from '@nxsandbox/rna-viz-2d';

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

const state = State.create({
  pairs: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  bases: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
});

// Draw RNA
const container = new PIXI.Container();
container.x = window.innerWidth / 2;
container.y = window.innerHeight / 2;
app.stage.addChild(container);

const rna = computeRNA(state.getProperty("pairs"), state.getProperty("bases"));
console.log({rna});

// TODO belongs in RNA viz 2d
function getBaseTexture(base: RNABase) {
  switch (base) {
    case RNABase.URACIL: return "assets/new_big_blue.png";
    case RNABase.CYTOSINE: return "assets/new_big_green.png";
    case RNABase.GUANINE: return "assets/new_big_red.png";
    default: return "assets/new_big_yellow.png";
  }
}

function drawRNA(rna: IRNA, container: PIXI.Container) {
  container.removeChildren();
  for (let i = 0; i < rna.sequence.length; ++i) {
    const texture = getBaseTexture(rna.sequence.baseArray[i]);
    const baseSprite = new PIXI.Sprite(PIXI.Texture.from(texture));
    baseSprite.x = rna.xarray[i]; // - baseSprite.getBounds().width / 2;
    baseSprite.y = rna.yarray[i]; // - baseSprite.getBounds().height / 2;    

    baseSprite.interactive = true;
    baseSprite.on("pointerdown", e => {
      const bases = State.instance.getProperty("bases").slice();
      bases[i] = 4;
      State.instance.setProperty("bases", bases);      
      
      const pairs = State.instance.getProperty("bases").slice();
      pairs[0] = Math.round(Math.random() * 10);
      State.instance.setProperty("pairs", pairs);
      e.stopPropagation();
    });

    // baseSprite.on("mouseover", e => {
    //     console.log("mouseover " + i);
    // });
    // baseSprite.on("mouseout", e => {
    //     console.log("mouseout " + i);
    // });
    container.addChild(baseSprite);
  }
}

drawRNA(rna, container);

State.instance.onPropertyChanged.attach(data => {
  const { name, oldValue, newValue } = data;
  switch (name) {
    case "bases":
    case "pairs":
      {
        const rna = computeRNA(state.getProperty("pairs"), state.getProperty("bases"));
        const from = Array.from(new Array(rna.sequence.length)).map((_, i) => [container.getChildAt(i).x, container.getChildAt(i).y]);

        // Animate RNA
        const ticker = new PIXI.Ticker();
        let time = 0;
        let progress = 0;
        let done = false;
        ticker.add(() => {            
          time += ticker.deltaMS / 1000;
          progress = time * 2;
          if (progress > 1) {
            progress = 1;
            done = true;
          }
          for (let i = 0; i < rna.sequence.length; ++i) {
            const sprite = container.getChildAt(i);
            sprite.x = from[i][0] + (rna.xarray[i] - from[i][0]) * progress;
            sprite.y = from[i][1] + (rna.yarray[i] - from[i][1]) * progress;
          }
          if (done) {
            ticker.destroy();
          }
        });
        ticker.start();
        //drawRNA(rna, container);
      }
      break;
  }
});


let pressed = false;
const touchStart = new PIXI.Point();
const cameraStartOffset = new PIXI.Point();
let cameraZoom = 1;

app.renderer.plugins.interaction.on("pointerdown", (e: PIXI.InteractionEvent) => {
  if (e.stopped) {
    return;
  }
  touchStart.copyFrom(e.data.global);
  cameraStartOffset.copyFrom(app.stage.position);
  pressed = true;
});

app.renderer.plugins.interaction.on("pointermove", (e: PIXI.InteractionEvent) => {
  if (e.stopped) {
    return;
  }
  if (pressed) {
    const dx = e.data.global.x - touchStart.x;
    const dy = e.data.global.y - touchStart.y;
    app.stage.position.set(
      cameraStartOffset.x + dx,
      cameraStartOffset.y + dy,
    );
  }
});

app.renderer.plugins.interaction.on("pointerup", (e: PIXI.InteractionEvent) => {
  if (e.stopped) {
    return;
  }
  if (pressed) {
    pressed = false;
  }
});

window.addEventListener("wheel", e => {
  const deltaZoom = e.deltaY * .001;
  cameraZoom += deltaZoom;
  app.stage.scale.set(cameraZoom, cameraZoom);

  // const dx = app.renderer.width * deltaZoom / 2;
  // const dy = app.renderer.height * deltaZoom / 2;
  // console.log(dx, dy);
  // app.stage.position.set(
  //   app.stage.position.x + dx,
  //   app.stage.position.y + dy 
  // )
});

// Bee
// const bee = new PIXI.Sprite(PIXI.Texture.from("assets/bee_dynamic.svg"));
// bee.x = 200;
// container.addChild(bee);

// const bee2 = new PIXI.Sprite(PIXI.Texture.from("assets/bee_dynamic2.svg"));
// bee2.x = 350;
// bee2.scale.x = 6;
// bee2.scale.y = 6;
// container.addChild(bee2);

// const bee3 = new PIXI.Sprite(PIXI.Texture.from("assets/bee_static.svg"));
// bee3.x = 750;
// container.addChild(bee3);

// const bee4 = new PIXI.Sprite(PIXI.Texture.from("assets/bee_dynamic3.svg", {resourceOptions: {scale: 6}}));
// bee4.x = 750;
// bee4.y = 400;
// container.addChild(bee4);
