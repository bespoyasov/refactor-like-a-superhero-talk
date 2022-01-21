// Pretend like this is an API call =)

export function callApi(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(order);
      resolve("some-order-id");
    }, 500);
  });
}
