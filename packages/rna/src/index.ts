
import { RNABase } from './lib/Epars';
import RNALayout from './lib/RNALayout';
import type { IRNA } from './lib/types';
import SecStruct from './lib/types/SecStruct';
import Sequence from './lib/types/Sequence';

export function computeRNA(pairs: number[], bases: number[]): IRNA {
    const rnaDrawer = new RNALayout(45, 45);
    rnaDrawer.setupTree(new SecStruct(pairs));
    rnaDrawer.drawTree();    
    const sequence = new Sequence(bases);
    return {
        sequence,
        ...rnaDrawer.getCoords(sequence.length)
    };
}

export { 
    IRNA,
    RNABase 
};
