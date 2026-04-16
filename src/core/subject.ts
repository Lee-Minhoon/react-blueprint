type Listener<T> = (val: T) => void;
type Unsubscribe = () => void;
type Subscribe<T> = (listener: Listener<T>) => Unsubscribe;
interface Observable<T> {
  subscribe: Subscribe<T>;
}

export class Subject<T> implements Observable<T> {
  private subscribers = new Set<Listener<T>>();

  public subscribe = (listener: Listener<T>) => {
    this.subscribers.add(listener);

    return () => this.unsubscribe(listener);
  };

  private unsubscribe = (listener: Listener<T>) => {
    this.subscribers.delete(listener);
  };

  protected notify = (value: T) => {
    this.subscribers.forEach((listener) => {
      try {
        listener(value);
      } catch (error) {
        console.error("Error in listener:", error);
      }
    });
  };
}
