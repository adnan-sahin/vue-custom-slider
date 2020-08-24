export const throttle = (fn, delay) => {
  let last = 0;
  return (...args) => {
    debugger;
    const now = new Date().getTime();
    if (now - last < delay) {
      return;
    }
    debugger;
    last = now;
    return fn(...args);
  };
};
