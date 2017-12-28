export default fn => {
  if (process.env.BROWSER) {
    const prevHandler = window.onerror;

    window.onerror = (...args) => {
      fn(...args);
      if (prevHandler) prevHandler(...args);
    };
  }
};
