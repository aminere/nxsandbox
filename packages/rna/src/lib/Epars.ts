
/**
 * These numbers can appear in a sequence: basically, ?ACGU&
 */
 export enum RNABase {
    UNDEFINED = 0,
    GUANINE = 3,
    ADENINE = 1,
    URACIL = 4,
    CYTOSINE = 2,
    CUT = 19,
}

export default class EPars {
    public static pairType(a: number, b: number): number {
        return EPars.PAIR_TYPE_MAT[a * 8 + b];
    }    

    public static stringToNucleotide(value: string, allowCut = true, allowUnknown = true): number {
        if (value === 'A' || value === 'a') {
            return RNABase.ADENINE;
        } else if (value === 'G' || value === 'g') {
            return RNABase.GUANINE;
        } else if (value === 'U' || value === 'u') {
            return RNABase.URACIL;
        } else if (value === 'C' || value === 'c') {
            return RNABase.CYTOSINE;
        } else if (value === '&' || value === '-' || value === '+') {
            if (allowCut) {
                return RNABase.CUT;
            } else {
                throw new Error(`Bad nucleotide '${value}`);
            }
        } else if (allowUnknown) {
            return RNABase.UNDEFINED;
        } else {
            throw new Error(`Bad nucleotide '${value}`);
        }
    }

    public static getColoredLetter(letter: string): string {
        if (letter === 'G') {
            return '<G>G</G>';
        } else if (letter === 'A') {
            return '<A>A</A>';
        } else if (letter === 'U') {
            return '<U>U</U>';
        } else if (letter === 'C') {
            return '<C>C</C>';
        }

        return '';
    }

    public static nucleotideToString(value: number, allowCut = true, allowUnknown = true): string {
        if (value === RNABase.ADENINE) {
            return 'A';
        } else if (value === RNABase.URACIL) {
            return 'U';
        } else if (value === RNABase.GUANINE) {
            return 'G';
        } else if (value === RNABase.CYTOSINE) {
            return 'C';
        } else if (value === RNABase.CUT) {
            if (allowCut) {
                return '&';
            } else {
                throw new Error(`Bad nucleotide '${value}`);
            }
        } else if (allowUnknown) {
            return '?';
        } else {
            throw new Error(`Bad nucleotide '${value}`);
        }
    }

    private static readonly PAIR_TYPE_MAT: number[] = [
        /* _  A  C  G  U  X  K  I */
        1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 5, 0, 0, 5,
        0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 2, 0, 3, 0, 0, 0,
        0, 6, 0, 4, 0, 0, 0, 6,
        0, 0, 0, 0, 0, 0, 2, 0,
        0, 0, 0, 0, 0, 1, 0, 0,
        0, 6, 0, 0, 5, 0, 0, 0
    ];
}
