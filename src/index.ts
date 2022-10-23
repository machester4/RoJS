export interface IObservable {
  subscribe<T>(next: NextFn<T>): ISubscription;
}

export type NextFn<T> = (value: T) => void;

export interface ISubscription {
  unsubscribe: UnsubscribeFn;
}

export type UnsubscribeFn = () => void;

export class Subscription implements ISubscription {
  constructor(private _unsubscribe: UnsubscribeFn) {}

  unsubscribe(): void {
    this._unsubscribe();
  }
}

export class Observable implements IObservable {
  private _subscriptions: Map<string, ISubscription> = new Map();
  private _subscriptionsHandlers: Map<string, NextFn<any>> = new Map();

  subscribe<T>(next: NextFn<T>): ISubscription {
    const id = new Date().getTime().toString();
    const subscription = new Subscription(this._unsubscribe(id));

    this._subscriptions.set(id, subscription);
    this._subscriptionsHandlers.set(id, next);

    return subscription;
  }

  private _unsubscribe(id: string): UnsubscribeFn {
    return () => {
      this._subscriptions.delete(id);
      this._subscriptionsHandlers.delete(id);
    };
  }

  protected _next(value: any): void {
    this._subscriptionsHandlers.forEach((next, _) => {
      next(value);
    });
  }
}
