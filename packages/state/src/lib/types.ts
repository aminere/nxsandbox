

export interface IState {
    pairs: number[];
    bases: number[];
}

export type IProperty = number[];

export interface IPropertyChanged {
    name: keyof IState;
    oldValue: IProperty;
    newValue: IProperty;
}
