// src/lib/toast.ts
export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastOptions {
  id?: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number; // in milliseconds, defaults to 4000
}

type ToastListener = (toasts: ToastOptions[]) => void;

class ToastManager {
  private toasts: ToastOptions[] = [];
  private listeners: Set<ToastListener> = new Set();

  subscribe(listener: ToastListener) {
    this.listeners.add(listener);
    listener(this.toasts);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  show(options: ToastOptions) {
    const id = options.id || Math.random().toString(36).substring(2, 9);
    const duration = options.duration ?? 4000;
    const newToast: ToastOptions = { ...options, id, duration };

    // Prevent duplicate spamming of exact same message
    const exists = this.toasts.some((t) => t.message === options.message);
    if (exists) return id;

    this.toasts = [...this.toasts, newToast];
    this.notify();

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    return id;
  }

  dismiss(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  success(message: string, options?: Omit<ToastOptions, "message" | "type">) {
    return this.show({ message, ...options, type: "success" });
  }

  error(message: string, options?: Omit<ToastOptions, "message" | "type">) {
    return this.show({ message, ...options, type: "error" });
  }

  info(message: string, options?: Omit<ToastOptions, "message" | "type">) {
    return this.show({ message, ...options, type: "info" });
  }

  warning(message: string, options?: Omit<ToastOptions, "message" | "type">) {
    return this.show({ message, ...options, type: "warning" });
  }
}

export const toast = new ToastManager();