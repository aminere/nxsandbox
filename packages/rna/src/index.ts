
import { RNABase } from './lib/Epars';
import RNALayout from './lib/RNALayout';
import SecStruct from './lib/types/SecStruct';
import Sequence from './lib/types/Sequence';

export function drawRNA() {
    const rnaDrawer = new RNALayout(45, 45);
    rnaDrawer.setupTree(new SecStruct([-1, 13, 12, 11, 10, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1]));
    rnaDrawer.drawTree();    
    const sequence = new Sequence([2, 1, 2, 3, 4, 1, 1, 1, 1, 4, 3, 2, 3, 4, 1]);
    return {
        sequence,
        ...rnaDrawer.getCoords(sequence.length)
    };
}

export function getBaseTexture(base: RNABase) {
    switch (base) {
        case RNABase.URACIL: return "assets/new_big_blue.png";
        case RNABase.CYTOSINE: return "assets/new_big_green.png";
        case RNABase.GUANINE: return "assets/new_big_red.png";
        default: return "assets/new_big_yellow.png";
      }
}
