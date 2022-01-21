export function robustAsync(fn) {
  return async function perform(...args) {
    try {
      const result = await fn(...args);
      return { result, error: null };
    } catch (error) {
      return { result: null, error };
    }
  };
}
