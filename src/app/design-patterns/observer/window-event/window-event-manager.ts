import { Observable, Subject } from "@/core/subject";

type Key = keyof WindowEventMap;

class WindowEventSubject<T extends keyof WindowEventMap> extends Subject<
  WindowEventMap[T]
> {
  constructor(type: T) {
    super();
    if (typeof window !== "undefined") {
      window.addEventListener(type, (e) => this.notify(e));
    }
  }
}

export class WindowEventManager {
  private subjects = new Map<Key, Observable<WindowEventMap[Key]>>();

  public get<K extends Key>(type: K) {
    if (!this.subjects.has(type)) {
      this.subjects.set(type, new WindowEventSubject<K>(type));
    }

    return this.subjects.get(type) as Observable<WindowEventMap[K]>;
  }
}

export const windowEvents = new WindowEventManager();
