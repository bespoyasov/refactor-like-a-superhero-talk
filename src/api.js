// Pretend like this is an API call =)

function callApi(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(order);
      resolve("some-order-id");
    }, 500);
  });
}

export const purchaseApi = {
  sendOrder: callApi,
};
