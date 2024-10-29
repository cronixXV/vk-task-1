export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      fn(...args);
      lastTime = now;
    }
  };
}
