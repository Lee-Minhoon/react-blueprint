import { Subject } from "@/core/subject";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

class ToastSubject extends Subject<Toast[]> {
  private toasts: Toast[] = [];
  private timers = new Map<string, ReturnType<typeof setTimeout>>();

  public show = (message: string, type: Toast["type"]) => {
    const id = crypto.randomUUID();
    const newToast: Toast = { id, message, type };
    this.toasts = [...this.toasts, newToast];
    this.notify(this.toasts);

    const timer = setTimeout(() => {
      this.hide(id);
    }, 3000);
    this.timers.set(id.toString(), timer);
  };

  public hide = (id: string) => {
    if (this.timers.has(id.toString())) {
      clearTimeout(this.timers.get(id.toString())!);
      this.timers.delete(id.toString());
    }

    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify(this.toasts);
  };

  public getToasts = () => {
    return this.toasts;
  };
}

export const toast = new ToastSubject();
