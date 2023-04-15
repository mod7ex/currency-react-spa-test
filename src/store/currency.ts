/**
 * Todo, persist user currency to localStorage
 */

export class Store {
  private _subscribers = new Set<Fn>();
  private _data?: Currency[];
  private _selected?: Currency["symbol"];

  get currencies() {
    return this._data;
  }

  get selected() {
    return this._data?.find(({ symbol }) => symbol === this._selected);
  }

  get filled() {
    return !!this._data;
  }

  pick(payload: Currency["symbol"]) {
    this._selected = payload;
    this.notify();
  }

  set(payload: Currency[]) {
    this._data = payload;
    this.notify();
  }

  subscribe(notify: Fn) {
    this._subscribers.add(notify);

    return () => this._subscribers.delete(notify);
  }

  notify() {
    this._subscribers.forEach((fn) => fn());
  }
}

export default new Store();
