interface IObservable {
  subscribe<T>(next: NextFn<T>): ISubscription;
}

type NextFn<T> = (value: T) => void;

interface ISubscription {
  unsubscribe: UnsubscribeFn;
}

type UnsubscribeFn = () => void;

class Subscription implements ISubscription {
  constructor(private _unsubscribe: UnsubscribeFn) {}

  unsubscribe(): void {
    this._unsubscribe();
  }
}

class Observable implements IObservable {
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
