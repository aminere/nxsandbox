import type { IRNA } from "@nxsandbox/rna";
import { RNABase } from "@nxsandbox/rna";
import * as PIXI from "pixi.js";

function getBaseTexture(base: RNABase) {
    switch (base) {
        case RNABase.URACIL: return "assets/new_big_blue.png";
        case RNABase.CYTOSINE: return "assets/new_big_green.png";
        case RNABase.GUANINE: return "assets/new_big_red.png";
        default: return "assets/new_big_yellow.png";
    }
}

export function drawRNA(rna: IRNA, container: PIXI.Container) {
    for (let i = 0; i < rna.sequence.length; ++i) {
        const texture = getBaseTexture(rna.sequence.baseArray[i]);
        const baseSprite = new PIXI.Sprite(PIXI.Texture.from(texture));
        baseSprite.x = rna.xarray[i] - baseSprite.getBounds().width / 2;
        baseSprite.y = rna.yarray[i] - baseSprite.getBounds().height / 2;
        baseSprite.y = rna.yarray[i] - baseSprite.getBounds().height / 2;

        // baseSprite.interactive = true;
        // baseSprite.on("pointerdown", e => {
        //     console.log("base pointerdown " + i);
        //     State.instance.setProperty("bases", [i]);
        //     e.stopPropagation();
        // });
        // baseSprite.on("mouseover", e => {
        //     console.log("mouseover " + i);
        // });
        // baseSprite.on("mouseout", e => {
        //     console.log("mouseout " + i);
        // });

        container.addChild(baseSprite);
    }
}

