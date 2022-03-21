import Sequence from "./types/Sequence";

export interface IRNA {
    sequence: Sequence;
    xarray: number[];
    yarray: number[];
    xbounds: number[];
    ybounds: number[];
}
