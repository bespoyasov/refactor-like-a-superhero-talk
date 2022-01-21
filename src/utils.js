export function robustAsync(fn) {
  return async function perform(...args) {
    try {
      const result = await fn(...args);
      return { value: result, error: null };
    } catch (error) {
      return { value: null, error };
    }
  };
}
