import { IProperty, IPropertyChanged, IState } from "./types";
import { AsyncEvent } from 'ts-events';

export class State {

    public static create(state: IState) {
        console.assert(!this._instance);
        this._instance = new State(state);
        return this._instance;
    }

    public static get instance() {
        console.assert(Boolean(this._instance));
        return this._instance;
    }
    
    private static _instance: State;

    public get onPropertyChanged() { return this._onPropertyChanged; };

    public setProperty(name: keyof IState, value: IProperty) {
        const oldValue = this._state[name];
        const newValue = value;
        // TODO runtime type checking?
        this._state[name] = newValue;
        this.onPropertyChanged.post({ name, oldValue, newValue });
    }

    public getProperty(name: keyof IState) {
        return this._state[name];
    }

    private constructor(state: IState) {
        this._state = state;
    }

    private readonly _onPropertyChanged = new AsyncEvent<IPropertyChanged>();
    private readonly _state: IState;
}

