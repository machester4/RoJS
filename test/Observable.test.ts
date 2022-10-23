import { Observable } from '../src';

test('Observable', () => {
    class TestObservable extends Observable {
        public next(value: any): void {
            this._next(value);
        }
    }

    const observable = new TestObservable();
    const next = jest.fn();
    const subscription = observable.subscribe(next);

    observable.next(1);
    observable.next(2);
    subscription.unsubscribe();
    observable.next(3);

    expect(next).toHaveBeenCalledTimes(2);
});